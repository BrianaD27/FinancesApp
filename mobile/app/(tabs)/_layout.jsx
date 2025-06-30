import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarStyle: {
        height: Platform === 'web' ? 90 : 80
    } 
    }}>
        <Tabs.Screen name="home-stack" options={{ title: 'Home 🏠' }} />
        <Tabs.Screen name="chatbot-stack" options={{ title: 'Chat ✏️' }} />
    </Tabs>
  );
}