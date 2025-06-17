import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{fontWeight: "bold", fontSize: 20}}>Log In Page</Text>
      <Link href={"/signup"}>Sign Up</Link>
      <Link href={"/verify"}>Verify</Link>
    </View>
  );
}
