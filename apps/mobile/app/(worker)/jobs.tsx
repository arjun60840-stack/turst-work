import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { COLORS } from '../../src/utils/constants';

export default function WorkerJobs() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Available Jobs Near You</Text>
      
      <Card style={styles.card}>
        <Card.Title title="Electrical Repair" subtitle="3 km away • Today, 2:00 PM" />
        <Card.Content>
          <Text>Individual Hiring • Budget: ₹800</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Ignore</Button>
          <Button mode="contained">Apply</Button>
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
