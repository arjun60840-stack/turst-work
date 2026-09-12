import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/utils/constants';

export default function MatchesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI matching delay
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 16 }}>AI is analyzing worker skills & availability...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Top Matches Found</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>2 matches found based on skills and location.</Text>

      <Card style={styles.matchCard}>
        <Card.Title title="👤 TEAM ALPHA" subtitle="4 Workers • Verified ✓" titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.scoreRow}>
            <Chip icon="star" style={styles.matchChip}>95% MATCH</Chip>
            <Text variant="bodySmall">📍 2.8 km away</Text>
          </View>
          <Text variant="bodyMedium" style={styles.reasonTitle}>Why this match?</Text>
          <Text style={styles.reason}>✓ All required skills available</Text>
          <Text style={styles.reason}>✓ Strong reliability score (92%)</Text>
          <Text style={styles.reason}>✓ verified cooperative</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>View Team</Button>
          <Button mode="contained" onPress={() => router.push('/(customer)/booking/demo')}>Book Team</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.matchCard}>
        <Card.Title title="👤 RAHUL KUMAR" subtitle="Individual • Verified ✓" titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.scoreRow}>
            <Chip icon="star" style={styles.matchChipSecondary}>88% MATCH</Chip>
            <Text variant="bodySmall">📍 1.5 km away</Text>
          </View>
          <Text variant="bodyMedium" style={styles.reasonTitle}>Why this match?</Text>
          <Text style={styles.reason}>✓ Nearby</Text>
          <Text style={styles.reason}>✓ Available at requested time</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>View Profile</Button>
          <Button mode="contained" onPress={() => router.push('/(customer)/booking/demo')}>Book Now</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', color: COLORS.primary },
  subtitle: { marginBottom: 20, color: COLORS.textSecondary },
  matchCard: { marginBottom: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  cardTitle: { fontWeight: 'bold' },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  matchChip: { backgroundColor: '#D1FAE5' }, // light green
  matchChipSecondary: { backgroundColor: '#FEF3C7' }, // light amber
  reasonTitle: { fontWeight: 'bold', marginBottom: 4, marginTop: 8 },
  reason: { color: COLORS.textSecondary, marginBottom: 2 },
});
