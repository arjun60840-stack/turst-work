import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { COLORS } from '../../src/utils/constants';
import { useRouter } from 'expo-router';

export default function CustomerMyJobs() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>My Jobs</Text>
      
      <Card style={styles.card}>
        <Card.Title title="House Painting" subtitle="Tomorrow, 9:00 AM" />
        <Card.Content>
          <Text style={{ color: COLORS.pending, fontWeight: 'bold', marginBottom: 8 }}>Status: Booked</Text>
          <Text>Team Alpha (4 Workers)</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" onPress={() => router.push('/(customer)')}>Back</Button>
          <Button mode="contained">Track Progress</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: COLORS.surface }
});
