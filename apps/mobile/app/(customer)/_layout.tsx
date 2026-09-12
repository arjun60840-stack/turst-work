import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/utils/constants';

export default function CustomerLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.surface,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="my-jobs" options={{ title: 'My Jobs', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="create-job" options={{ title: 'Post Job', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="notifications" options={{ title: 'Alerts', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell-outline" size={24} color={color} /> }} />
    </Tabs>
  );
}
