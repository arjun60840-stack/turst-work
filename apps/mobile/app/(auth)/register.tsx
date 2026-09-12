import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { UserRole } from '../../../../packages/shared/src/types';
import { COLORS } from '../../src/utils/constants';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>(UserRole.CUSTOMER);
  
  const { register, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register({ name, email, phone, password, role: role as UserRole });
      router.replace('/');
    } catch (e) {
      // Error handled in store
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

        <SegmentedButtons
          value={role}
          onValueChange={setRole}
          buttons={[
            { value: UserRole.CUSTOMER, label: 'Customer' },
            { value: UserRole.WORKER, label: 'Worker' },
            { value: UserRole.COOPERATIVE, label: 'Co-op Leader' },
          ]}
          style={styles.segmented}
        />

        <TextInput label="Full Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
        <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
        <TextInput label="Phone Number" value={phone} onChangeText={setPhone} mode="outlined" keyboardType="phone-pad" style={styles.input} />
        <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry style={styles.input} />

        {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}

        <Button mode="contained" onPress={handleRegister} loading={isLoading} style={styles.button}>
          Register
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  segmented: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: COLORS.surface,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  }
});
