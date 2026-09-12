import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { COLORS } from '../../src/utils/constants';

export default function EarningsSplitScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Transparent Wage Split</Text>
      <Text style={styles.subtitle}>Recent Job: Building Painting</Text>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.rowTotal}>
            <Text variant="titleLarge">Total Payment:</Text>
            <Text variant="titleLarge" style={{ color: COLORS.primary }}>₹5,000</Text>
          </View>
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text>👷 Worker 1 (Rahul)</Text>
            <Text>₹1,100</Text>
          </View>
          <View style={styles.row}>
            <Text>👷 Worker 2 (Amit)</Text>
            <Text>₹1,100</Text>
          </View>
          <View style={styles.row}>
            <Text>👷 Worker 3 (Priya)</Text>
            <Text>₹1,100</Text>
          </View>
          <View style={styles.row}>
            <Text>👷 Worker 4 (Suresh)</Text>
            <Text>₹1,000</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text>🤝 Cooperative Fund</Text>
            <Text>₹500</Text>
          </View>
          <View style={styles.row}>
            <Text>🏢 Platform Fee</Text>
            <Text>₹200</Text>
          </View>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.btn}>Process Demo Payment (Distribute)</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', color: COLORS.primary },
  subtitle: { marginBottom: 20, color: COLORS.textSecondary },
  card: { backgroundColor: COLORS.surface, marginBottom: 20 },
  rowTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  btn: { paddingVertical: 8 }
});
