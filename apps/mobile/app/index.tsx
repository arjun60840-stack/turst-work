import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { COLORS } from '../src/utils/constants';
import { UserRole } from '../../../../packages/shared/src/types';

export default function Index() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.surface} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.role === UserRole.WORKER) return <Redirect href="/(worker)" />;
  if (user.role === UserRole.CUSTOMER) return <Redirect href="/(customer)" />;
  if (user.role === UserRole.COOPERATIVE) return <Redirect href="/(cooperative)" />;

  return <Redirect href="/(auth)/login" />;
}
