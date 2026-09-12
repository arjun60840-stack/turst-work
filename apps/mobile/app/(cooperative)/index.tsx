import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/utils/constants';

export default function CooperativeDashboard() {
  const { cooperative, logout } = useAuthStore();
  
  if (!cooperative) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={64} label={cooperative.name.substring(0, 2).toUpperCase()} />
        <View style={styles.headerInfo}>
          <Text variant="headlineSmall" style={styles.name}>{cooperative.name}</Text>
          <Text variant="bodyMedium">Manage your workforce and grow together.</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.center}>
            <Text variant="headlineMedium">{cooperative.member_count}</Text>
            <Text variant="bodySmall">Members</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.center}>
            <Text variant="headlineMedium">{cooperative.total_jobs_completed}</Text>
            <Text variant="bodySmall">Jobs Done</Text>
          </Card.Content>
        </Card>
      </View>

      <Text variant="titleLarge" style={styles.sectionTitle}>Pending Group Requests</Text>
      
      <Card style={styles.jobCard}>
        <Card.Content>
          <Text variant="titleMedium">Construction Site Cleanup - Need 6 Workers</Text>
          <Text variant="bodySmall" color={COLORS.textSecondary}>Budget: ₹7,000</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Assign Team</Button>
        </Card.Actions>
      </Card>

      <Button mode="outlined" style={styles.logoutButton} onPress={logout}>
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerInfo: { marginLeft: 16, flex: 1 },
  name: { fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 0.48, backgroundColor: COLORS.surface },
  center: { alignItems: 'center' },
  sectionTitle: { fontWeight: 'bold', marginBottom: 12 },
  jobCard: { backgroundColor: COLORS.surface },
  logoutButton: { marginTop: 30 }
});
