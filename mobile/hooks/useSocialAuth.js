import React from "react";
import { Alert } from "react-native";
import { useSSO } from "@clerk/clerk-expo";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy) => {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Error during social authentication:", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(`Failed to authenticate with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, handleSocialAuth];
};
