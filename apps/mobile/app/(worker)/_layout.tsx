import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/utils/constants';

export default function WorkerLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.surface,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard" size={24} color={color} /> }} />
      <Tabs.Screen name="jobs" options={{ title: 'Jobs', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="briefcase-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Passport', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="card-account-details-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="earnings" options={{ title: 'Earnings', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cash-multiple" size={24} color={color} /> }} />
      <Tabs.Screen name="welfare" options={{ title: 'Welfare', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shield-check" size={24} color={color} /> }} />
    </Tabs>
  );
}
