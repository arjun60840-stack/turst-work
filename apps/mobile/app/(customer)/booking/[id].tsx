import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/utils/constants';

export default function BookingScreen() {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);

  const confirmBooking = () => {
    // Proceed to Job tracking / My Jobs
    router.replace('/(customer)/my-jobs');
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Job Agreement</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionHeader}>Service Details</Text>
          <Text>Service: House Painting (Group)</Text>
          <Text>Team: Team Alpha (4 Workers)</Text>
          <Text>Date: Tomorrow, 9:00 AM</Text>
          
          <Divider style={styles.divider} />
          
          <Text variant="titleMedium" style={styles.sectionHeader}>Transparent Budget Breakdown</Text>
          <View style={styles.row}>
            <Text>Worker Wages (Total)</Text>
            <Text>₹3,600</Text>
          </View>
          <View style={styles.row}>
            <Text>Cooperative Fund (10%)</Text>
            <Text>₹400</Text>
          </View>
          <View style={styles.row}>
            <Text>Platform Fee (10%)</Text>
            <Text>₹400</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowTotal}>
            <Text style={styles.bold}>Total Payment</Text>
            <Text style={styles.bold}>₹4,400</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.agreementRow}>
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
        <Text style={styles.agreementText}>I agree to the transparent wage split and platform terms.</Text>
      </View>

      <Button 
        mode="contained" 
        style={styles.confirmBtn} 
        disabled={!checked} 
        onPress={confirmBooking}
      >
        Confirm Booking
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', marginBottom: 16, color: COLORS.primary },
  card: { backgroundColor: COLORS.surface, marginBottom: 20 },
  sectionHeader: { fontWeight: 'bold', marginBottom: 8, marginTop: 8 },
  divider: { marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  rowTotal: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  bold: { fontWeight: 'bold', fontSize: 16 },
  agreementRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  agreementText: { flex: 1, marginLeft: 8 },
  confirmBtn: { paddingVertical: 6 }
});
