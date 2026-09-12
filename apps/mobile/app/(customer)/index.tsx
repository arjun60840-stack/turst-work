import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/utils/constants';

export default function CustomerDashboard() {
  const { customer, logout } = useAuthStore();
  const router = useRouter();

  if (!customer) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={64} label={customer.name.substring(0, 2).toUpperCase()} />
        <View style={styles.headerInfo}>
          <Text variant="headlineSmall" style={styles.name}>Hi, {customer.name}</Text>
          <Text variant="bodyMedium">Need reliable workers today?</Text>
        </View>
      </View>

      <Card style={styles.actionCard} onPress={() => router.push('/(customer)/create-job')}>
        <Card.Content style={styles.actionContent}>
          <View>
            <Text variant="titleMedium" style={styles.actionTitle}>Post a Job Request</Text>
            <Text variant="bodySmall" style={styles.actionDesc}>Find skilled workers or teams instantly.</Text>
          </View>
          <Button mode="contained" icon="plus" compact>Post</Button>
        </Card.Content>
      </Card>

      <Text variant="titleLarge" style={styles.sectionTitle}>Active Jobs</Text>
      
      <Card style={styles.jobCard}>
        <Card.Content>
          <Text variant="titleMedium">House Painting - 4 Workers</Text>
          <Text variant="bodySmall" color={COLORS.textSecondary}>Scheduled for Tomorrow, 9:00 AM</Text>
          <View style={styles.statusRow}>
            <Text style={{ color: COLORS.pending, fontWeight: 'bold' }}>Status: Workers Assigned</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button>Track Progress</Button>
        </Card.Actions>
      </Card>

      <Button mode="outlined" style={styles.logoutButton} onPress={logout}>
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  headerInfo: { marginLeft: 16, flex: 1 },
  name: { fontWeight: 'bold' },
  actionCard: { backgroundColor: COLORS.primaryLight, marginBottom: 24 },
  actionContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionTitle: { color: COLORS.surface, fontWeight: 'bold' },
  actionDesc: { color: COLORS.surface, opacity: 0.9 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 12 },
  jobCard: { marginBottom: 16, backgroundColor: COLORS.surface },
  statusRow: { marginTop: 8 },
  logoutButton: { marginTop: 20 }
});
