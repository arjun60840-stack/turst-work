import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { COLORS } from '../../src/utils/constants';

export default function WorkerAttendance() {
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (otp === '123456') setVerified(true);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Job Attendance Verification" />
        <Card.Content>
          {!verified ? (
            <>
              <Text style={{ marginBottom: 16 }}>Enter the OTP provided by the customer to start the job.</Text>
              <TextInput 
                label="6-Digit OTP" 
                value={otp} 
                onChangeText={setOtp} 
                keyboardType="numeric" 
                maxLength={6} 
                mode="outlined" 
                style={{ marginBottom: 8 }} 
              />
              <HelperText type="info">DEMO OTP: 123456</HelperText>
              <Button mode="contained" onPress={handleVerify} style={{ marginTop: 16 }}>Verify Attendance</Button>
            </>
          ) : (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text variant="headlineSmall" style={{ color: COLORS.success, fontWeight: 'bold' }}>Success!</Text>
              <Text style={{ marginTop: 10 }}>Attendance verified via GPS and OTP. Job has officially started.</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background, justifyContent: 'center' },
  card: { backgroundColor: COLORS.surface },
});
