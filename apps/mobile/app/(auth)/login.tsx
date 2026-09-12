import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/utils/constants';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.replace('/');
    } catch (e) {
      // Error handled in store
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 110, height: 110, alignSelf: 'center', marginBottom: 12 }}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>Work Trust</Text>
        <Text variant="bodySmall" style={[styles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
          Right Worker • Right Job • Right Location • Transparent Payment
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        
        {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}

        <Button mode="contained" onPress={handleLogin} loading={isLoading} style={styles.button}>
          Login
        </Button>

        <View style={styles.linkContainer}>
          <Text>Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Text style={styles.link}>Create Account</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.textSecondary,
  },
  input: {
    marginBottom: 15,
    backgroundColor: COLORS.surface,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  }
});
