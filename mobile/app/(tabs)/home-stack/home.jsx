import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Home</Text>
      <Link href={"/(tabs)/home-stack/create"}>To Create</Link>
    </View>
  )
}

export default Home