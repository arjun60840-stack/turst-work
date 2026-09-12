import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { COLORS } from '../../src/utils/constants';

export default function WorkerEarnings() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>My Earnings</Text>
      
      <Card style={styles.card}>
        <Card.Title title="Total Earnings" subtitle="All Time" />
        <Card.Content>
          <Text variant="displaySmall" style={{ color: COLORS.primary, fontWeight: 'bold' }}>₹12,450</Text>
        </Card.Content>
      </Card>
      
      <Text variant="titleMedium" style={{ marginTop: 20, marginBottom: 10 }}>Recent Transactions</Text>
      <Card style={styles.card}>
        <Card.Content style={styles.row}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>House Painting (Group)</Text>
            <Text variant="bodySmall" color={COLORS.textSecondary}>Today, 5:00 PM</Text>
          </View>
          <Text style={{ color: COLORS.success, fontWeight: 'bold' }}>+ ₹1,100</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: COLORS.surface, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
