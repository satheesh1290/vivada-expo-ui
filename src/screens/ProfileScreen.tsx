// components/ProfileScreen.js
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { AUTH_QUERIES } from "../components/queries/user_fetch"; // Adjust the import path
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const ProfileScreen = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(AUTH_QUERIES.ME);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const { me } = data;

  console.log(data, "me=>", me);

  const handleLogout = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
    } else {
      await AsyncStorage.removeItem("token");
    }
    router.replace("/sign-in");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Profile</Text>
      </View>
      <Image
        source={{ uri: me.avatar || "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.info}>{me.username}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{me.email}</Text>
      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.info}>{me.firstname}</Text>
      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.info}>{me.lastname}</Text>
      <Pressable onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfileScreen;
