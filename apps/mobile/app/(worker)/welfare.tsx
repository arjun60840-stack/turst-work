import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, Button, List } from 'react-native-paper';
import { COLORS, WELFARE_RESOURCES } from '../../src/utils/constants';

export default function WelfareScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Welfare & Safety Shield</Text>
      
      <Card style={styles.insuranceCard}>
        <Card.Content>
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.whiteText}>Micro-Insurance Status</Text>
            <Text style={styles.badge}>ACTIVE</Text>
          </View>
          <Text style={styles.whiteText}>Coverage: Accident & Health</Text>
          <Text style={{ color: COLORS.surface, opacity: 0.8, marginTop: 10 }}>* Demo / Future Integration</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" buttonColor={COLORS.error} icon="phone-alert" style={styles.emergencyBtn}>
        Emergency Help (SOS)
      </Button>

      <Card style={styles.card}>
        <Card.Title title="Safety Resources" />
        <Card.Content>
          {WELFARE_RESOURCES.map((res, i) => (
            <List.Item
              key={i}
              title={res.title}
              description={res.description}
              left={props => <List.Icon {...props} icon="shield-check" color={COLORS.primary} />}
            />
          ))}
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button mode="outlined" style={styles.actionBtn}>Report Incident</Button>
        <Button mode="outlined" style={styles.actionBtn}>Request Support</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', marginBottom: 20, color: COLORS.primary },
  insuranceCard: { backgroundColor: COLORS.secondary, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  whiteText: { color: COLORS.surface, fontWeight: 'bold' },
  badge: { backgroundColor: COLORS.surface, color: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontWeight: 'bold' },
  emergencyBtn: { marginBottom: 20, paddingVertical: 8 },
  card: { backgroundColor: COLORS.surface, marginBottom: 20 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flex: 0.48 }
});
