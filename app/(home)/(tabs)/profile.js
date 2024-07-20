// screens/profile/[id].js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileScreen from "../../../src/screens/ProfileScreen";

export default function ProfileRoute() {
  //   const { id } = route.params; // Retrieve the user ID from route params

  return (
    <View style={styles.container}>
      {/* <ProfileScreen userId={id} /> */}
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
