import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS, formatCurrency } from '../../src/utils/constants';

export default function WorkerDashboard() {
  const { worker, user, logout } = useAuthStore();
  const router = useRouter();

  if (!worker) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={64} label={worker.name.substring(0, 2).toUpperCase()} />
        <View style={styles.headerInfo}>
          <Text variant="headlineSmall" style={styles.name}>{worker.name}</Text>
          <Text variant="bodyMedium">Find the right work. Build your future.</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{worker.reliability_score}%</Text>
              <Text variant="bodySmall">Reliability</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{formatCurrency(worker.total_earnings)}</Text>
              <Text variant="bodySmall">Earnings</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleMedium">⭐ {worker.average_rating}</Text>
              <Text variant="bodySmall">Rating</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.actionButton} onPress={() => router.push('/(worker)/jobs')}>
        Browse Available Jobs
      </Button>

      <Button mode="outlined" style={styles.logoutButton} onPress={logout}>
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
    backgroundColor: COLORS.surface,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
  }
});
