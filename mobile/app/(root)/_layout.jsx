import { Redirect, Stack } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

export default function RootLayout() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return <Redirect href={'/signin'} />
  }

  return <Stack screenOptions={{headerShown: true}} />
}