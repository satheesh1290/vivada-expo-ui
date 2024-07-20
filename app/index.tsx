import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={require("../assets/welcome_image.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>
              Welcome to <Text style={styles.highlightedText}>Vivada!</Text>
            </Text>
          </View>

          <Link href="/sign-in" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1c1c1e", // Primary color
    height: "100%",
  },
  scrollView: {
    height: "100%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 16,
  },
  image: {
    width: 250,
    height: 154,
  },
  textContainer: {
    marginTop: 20,
    position: "relative",
  },
  welcomeText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  highlightedText: {
    color: "#ff4d4d", // Secondary color
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff4d4d", // Secondary color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
