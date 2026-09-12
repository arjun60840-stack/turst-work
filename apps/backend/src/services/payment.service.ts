import db from '../config/database';
import { env } from '../config/env';
import { generateId } from '../utils/helpers';

export interface PaymentProvider {
  createPayment(amount: number, metadata: any): Promise<any>;
  verifyPayment(transactionId: string): Promise<boolean>;
}

export class DemoPaymentProvider implements PaymentProvider {
  async createPayment(amount: number, metadata: any) {
    return {
      success: true,
      transactionId: `DEMO_TXN_${Date.now()}_${generateId().substring(0, 8)}`,
      status: 'completed'
    };
  }

  async verifyPayment(transactionId: string) {
    return transactionId.startsWith('DEMO_TXN_');
  }
}

export class PaymentService {
  private provider: PaymentProvider;

  constructor() {
    this.provider = new DemoPaymentProvider();
  }

  async processBookingPayment(bookingId: string) {
    const booking = await db('bookings').where({ id: bookingId }).first();
    if (!booking) throw new Error('Booking not found');

    // Create payment via provider
    const paymentResult = await this.provider.createPayment(booking.total_amount, { bookingId });

    if (!paymentResult.success) {
      throw new Error('Payment failed');
    }

    const paymentId = generateId();

    await db.transaction(async (trx) => {
      // Record payment
      await trx('payments').insert({
        id: paymentId,
        booking_id: bookingId,
        job_id: booking.job_id,
        customer_id: booking.customer_id,
        amount: booking.total_amount,
        status: paymentResult.status,
        payment_mode: 'demo',
        transaction_id: paymentResult.transactionId,
        paid_at: trx.fn.now()
      });

      // Split calculation
      if (booking.hiring_type === 'individual') {
        const platformFee = booking.total_amount * (env.PLATFORM_FEE_PERCENT / 100);
        const workerAmount = booking.total_amount - platformFee;

        await trx('payment_splits').insert([
          {
            id: generateId(), payment_id: paymentId, booking_id: bookingId,
            recipient_type: 'platform', recipient_id: null, amount: platformFee, description: 'Platform fee'
          },
          {
            id: generateId(), payment_id: paymentId, booking_id: bookingId,
            recipient_type: 'worker', recipient_id: booking.worker_id, amount: workerAmount, description: 'Worker wage'
          }
        ]);
        
        // Update booking records
        await trx('bookings').where({ id: bookingId }).update({
          worker_amount: workerAmount,
          platform_fee: platformFee
        });

      } else if (booking.hiring_type === 'group') {
        const platformFee = booking.total_amount * (env.PLATFORM_FEE_PERCENT / 100);
        const cooperativeAmount = (booking.total_amount - platformFee) * (env.COOPERATIVE_CONTRIBUTION_PERCENT / 100);
        const workerTotal = booking.total_amount - platformFee - cooperativeAmount;
        
        // find number of workers
        const workers = await trx('booking_workers').where({ booking_id: bookingId });
        const numWorkers = workers.length > 0 ? workers.length : 1;
        const perWorker = workerTotal / numWorkers;

        const splits = [
          {
            id: generateId(), payment_id: paymentId, booking_id: bookingId,
            recipient_type: 'platform', recipient_id: null, amount: platformFee, description: 'Platform fee'
          },
          {
            id: generateId(), payment_id: paymentId, booking_id: bookingId,
            recipient_type: 'cooperative', recipient_id: booking.cooperative_id, amount: cooperativeAmount, description: 'Cooperative fee'
          }
        ];

        for (const w of workers) {
          splits.push({
            id: generateId(), payment_id: paymentId, booking_id: bookingId,
            recipient_type: 'worker', recipient_id: w.worker_id, amount: perWorker, description: 'Worker wage share'
          });
          // Update wage amount on booking_worker
          await trx('booking_workers').where({ id: w.id }).update({ wage_amount: perWorker });
        }

        await trx('payment_splits').insert(splits);
        
        await trx('bookings').where({ id: bookingId }).update({
          cooperative_amount: cooperativeAmount,
          worker_amount: workerTotal,
          platform_fee: platformFee
        });
      }
    });

    return { paymentId, transactionId: paymentResult.transactionId, status: paymentResult.status };
  }
}

export const paymentService = new PaymentService();
