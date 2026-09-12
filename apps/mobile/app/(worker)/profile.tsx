import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, Chip, Button, Divider, ProgressBar } from 'react-native-paper';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/utils/constants';

export default function WorkerProfile() {
  const { worker } = useAuthStore();
  if (!worker) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={80} label={worker.name.substring(0, 2).toUpperCase()} style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.name}>{worker.name}</Text>
        <Chip icon="check-decagram" textStyle={{ color: COLORS.verified }} style={styles.verifiedChip}>
          {worker.verification_status.toUpperCase()}
        </Chip>
      </View>

      <Card style={styles.card}>
        <Card.Title title="Reliability & Stats" />
        <Card.Content>
          <View style={styles.progressRow}>
            <Text variant="bodyMedium">Reliability Score ({worker.reliability_score}%)</Text>
            <ProgressBar progress={worker.reliability_score / 100} color={COLORS.primary} style={styles.progressBar} />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text variant="titleLarge">⭐ {worker.average_rating}</Text>
              <Text variant="bodySmall">Rating</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="titleLarge">{worker.total_jobs_completed}</Text>
              <Text variant="bodySmall">Jobs Done</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Skills" />
        <Card.Content>
          <View style={styles.skillsContainer}>
            <Chip style={styles.skillChip} icon="star">Electrician (Expert)</Chip>
            <Chip style={styles.skillChip} icon="check">Plumbing (Intermed)</Chip>
          </View>
          <Button mode="outlined" style={styles.addButton} icon="plus">Add Skill</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Certifications" />
        <Card.Content>
          <View style={styles.certItem}>
            <Text variant="bodyLarge" style={styles.certTitle}>Govt. Electrician License</Text>
            <Text variant="bodySmall" color={COLORS.textSecondary}>Verified by NSDC • Valid till 2028</Text>
          </View>
          <Button mode="outlined" style={styles.addButton} icon="upload">Upload Certificate</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatar: { backgroundColor: COLORS.primary, marginBottom: 10 },
  name: { fontWeight: 'bold' },
  verifiedChip: { marginTop: 8, backgroundColor: '#E0F2FE' },
  card: { marginBottom: 16, backgroundColor: COLORS.surface },
  progressRow: { marginBottom: 10 },
  progressBar: { height: 8, borderRadius: 4, marginTop: 5 },
  divider: { marginVertical: 10 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  skillChip: { marginRight: 8, marginBottom: 8 },
  addButton: { marginTop: 10 },
  certItem: { marginBottom: 10 },
  certTitle: { fontWeight: 'bold' }
});
