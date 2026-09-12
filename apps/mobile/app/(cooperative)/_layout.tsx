import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/utils/constants';

export default function CooperativeLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.surface,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Co-op', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" size={24} color={color} /> }} />
      <Tabs.Screen name="members" options={{ title: 'Members', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-multiple" size={24} color={color} /> }} />
      <Tabs.Screen name="earnings" options={{ title: 'Wages', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="finance" size={24} color={color} /> }} />
    </Tabs>
  );
}
