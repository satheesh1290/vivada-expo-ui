// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import FETCH_CLAIMS from "../components/queries/fetch_claims";
import { DATA } from "../data_providers/data";
import { apolloClient } from "../providers/apollo";

const HomeScreen = () => {
  const router = useRouter();
  const [claims, setClaims] = useState([]);
  // const { loading, error, data } = useQuery(FETCH_CLAIMS, {
  //   variables: {
  //     offset: 0,
  //     limit: 10,
  //   },
  // });
  const fetchClaims = async (offset: number = 0, limit: number = 5) => {
    const { data } = await apolloClient.query({
      query: FETCH_CLAIMS,
      variables: {
        searchField: "",
        offset: offset,
        limit: limit,
      },
    });
    const newClaims = [...claims, ...data.claims];
    setClaims(newClaims);
    console.log(newClaims);
  };

  useEffect(() => {
    const checkAuth = async () => {
      let token;
      if (Platform.OS === "web") {
        token = localStorage.getItem("token");
      } else {
        token = await AsyncStorage.getItem("token");
      }
      if (!token) {
        router.replace("/sign-in");
      }
    };

    checkAuth();
    fetchClaims();
  }, [router]);

  const handleLoadMore = () => {
    fetchClaims(claims.length, 5);
  };

  const parseDate = (dateString) => {
    // Parse and format date as needed
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the App!</Text>
      <Text style={styles.subText}>We are glad to have you here.</Text>
      <FlatList
        data={claims}
        // data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.claimContainer}>
            <View style={styles.metadata}>
              <Pressable>
                <Image
                  source={{ uri: item.author.avatar }}
                  style={styles.avatar}
                  alt="author avatar"
                />
              </Pressable>
              <Pressable>
                <View>
                  <Text style={styles.firstname}>{item.author.firstname}</Text>
                  <Text style={styles.details}>
                    <Text style={styles.username}>@{item.author.username}</Text>{" "}
                    .
                    <Text style={styles.date}>{parseDate(item.createdAt)}</Text>{" "}
                    .
                    {item.circle && (
                      <Text style={styles.circle}>{item.circle.title}</Text>
                    )}
                    {item.topic && (
                      <Text style={styles.topic}>{item.topic.title}</Text>
                    )}
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.hr} />
            <Text style={styles.claimTitle}>{item.thesis}</Text>
            <View style={styles.br} />
          </View>
        )}
        contentContainerStyle={styles.claimsList}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  claimsList: {
    paddingHorizontal: 15,
    gap: 50,
  },
  claimContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  thesis: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  firstname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#6c757d",
  },
  username: {
    fontWeight: "bold",
  },
  date: {
    color: "#6c757d",
  },
  circle: {
    color: "#007bff",
    marginLeft: 5,
  },
  topic: {
    color: "#007bff",
    marginLeft: 5,
  },
  hr: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: 10,
  },
  claimTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  br: {
    marginVertical: 10,
  },
});

export default HomeScreen;
