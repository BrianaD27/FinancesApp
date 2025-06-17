import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="home-stack" options={{ title: 'Home 🏠' }} />
        <Tabs.Screen name="chatbot" options={{ title: 'Chat ✏️' }} />
    </Tabs>
  );
}