import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Verify = () => {
  const handleVerification = () => {
    router.replace("/(tabs)/home-stack/home");
  };

  return (
    <View>
      <Text>Verify</Text>
      <TouchableOpacity onPress={handleVerification}>
        <Text>
            Click to Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verify;
