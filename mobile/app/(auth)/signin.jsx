import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { styles } from "@/assets/styles/auth.styles";
import { Image } from "expo-image";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function Signin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home-stack/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const [isLoading, handleSocialAuth] = useSocialAuth();

  return (
    <View style={styles.container}>
      <Image
        style={styles.illustration}
        source={require("./../../assets/images/signIn.png")}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={email}
        placeholder="Enter email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {handleSocialAuth("oauth_google")}} style={styles.googleButton}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"black"} />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/google.png")}
              style={{ height: "35", width: "40", contentFit: "contain" }}
            />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text>Don&apos;t have an account?</Text>
        <Link href="/signup">
          <Text style={styles.linkText}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
