import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { HiringType } from '../../../../packages/shared/src/types';
import { COLORS, DEFAULT_SERVICE_CATEGORIES } from '../../src/utils/constants';

export default function CreateJobScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [hiringType, setHiringType] = useState<string>(HiringType.INDIVIDUAL);
  const [workersNeeded, setWorkersNeeded] = useState('1');
  const [budget, setBudget] = useState('');

  const submitJob = () => {
    // In real app, API call here
    // POST /api/jobs -> Response returns job_id -> Navigate to matches
    router.push({ pathname: '/(customer)/matches', params: { jobId: 'demo-job-123' } });
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Post a Job Request (Step {step}/3)</Text>

      {step === 1 && (
        <View>
          <Text variant="titleMedium" style={styles.label}>Select Service Category</Text>
          <View style={styles.grid}>
            {DEFAULT_SERVICE_CATEGORIES.map(cat => (
              <Button
                key={cat.name}
                mode={category === cat.name ? 'contained' : 'outlined'}
                style={styles.gridItem}
                onPress={() => setCategory(cat.name)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </View>
          <Button mode="contained" onPress={() => setStep(2)} disabled={!category} style={styles.nextBtn}>Next</Button>
        </View>
      )}

      {step === 2 && (
        <View>
          <TextInput label="Job Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
          <TextInput label="Description" value={desc} onChangeText={setDesc} mode="outlined" multiline numberOfLines={3} style={styles.input} />
          <Text variant="titleMedium" style={styles.label}>Hiring Type</Text>
          <SegmentedButtons
            value={hiringType}
            onValueChange={setHiringType}
            buttons={[
              { value: HiringType.INDIVIDUAL, label: 'Individual' },
              { value: HiringType.GROUP, label: 'Team/Group' },
            ]}
            style={{ marginBottom: 16 }}
          />
          {hiringType === HiringType.GROUP && (
             <TextInput label="Number of Workers" value={workersNeeded} onChangeText={setWorkersNeeded} keyboardType="numeric" mode="outlined" style={styles.input} />
          )}
          <View style={styles.row}>
            <Button mode="outlined" onPress={() => setStep(1)} style={styles.flexBtn}>Back</Button>
            <Button mode="contained" onPress={() => setStep(3)} style={styles.flexBtn}>Next</Button>
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
           <TextInput label="Budget (₹)" value={budget} onChangeText={setBudget} keyboardType="numeric" mode="outlined" style={styles.input} />
           <TextInput label="Location (Demo)" value="Mumbai Central" disabled mode="outlined" style={styles.input} />
           
           <View style={styles.summary}>
             <Text variant="titleMedium">Summary:</Text>
             <Text>{category} - {title}</Text>
             <Text>{hiringType === 'group' ? `${workersNeeded} Workers` : '1 Worker'} | ₹{budget}</Text>
           </View>

           <View style={styles.row}>
            <Button mode="outlined" onPress={() => setStep(2)} style={styles.flexBtn}>Back</Button>
            <Button mode="contained" onPress={submitJob} style={styles.flexBtn}>Find Matches</Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontWeight: 'bold', marginBottom: 20, color: COLORS.primary },
  label: { marginBottom: 10, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 10 },
  nextBtn: { marginTop: 20 },
  input: { marginBottom: 16, backgroundColor: COLORS.surface },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  flexBtn: { flex: 0.48 },
  summary: { padding: 16, backgroundColor: COLORS.surface, borderRadius: 8, marginBottom: 20 }
});
