// components/ProfileScreen.js
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../components/queries/user_fetch"; // Adjust the import path
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

// const ProfileScreen = () => {
//   const userId = 4;
//   const { loading, error, data } = useQuery(GET_USER, {
//     variables: { id: userId },
//   });

//   const [updateUser] = useMutation(UPDATE_USER);
//   const [deleteUser] = useMutation(DELETE_USER);

//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     avatar: "",
//     firstname: "",
//     lastname: "",
//     id: userId,
//   });

//   useEffect(() => {
//     if (data) {
//       setUser(data.user);
//     }
//   }, [data]);

//   const handleUpdate = () => {
//     updateUser({
//       variables: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         avatar: user.avatar,
//         password: user.password,
//       },
//     })
//       .then(() => {
//         Alert.alert("Profile updated successfully!");
//       })
//       .catch((err) => {
//         console.error(err);
//         Alert.alert("Error updating profile.");
//       });
//   };

//   const handleDelete = () => {
//     deleteUser({ variables: { id: user.id } })
//       .then(() => {
//         Alert.alert("Profile deleted successfully!");
//       })
//       .catch((err) => {
//         console.error(err);
//         Alert.alert("Error deleting profile.");
//       });
//   };

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error.message}</Text>;

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: user.avatar }} style={styles.avatar} />
//       <TextInput
//         style={styles.input}
//         value={user.username}
//         placeholder="Username"
//         onChangeText={(text) => setUser({ ...user, username: text })}
//       />
//       <TextInput
//         style={styles.input}
//         value={user.email}
//         placeholder="Email"
//         keyboardType="email-address"
//         onChangeText={(text) => setUser({ ...user, email: text })}
//       />
//       <TextInput
//         style={styles.input}
//         value={user.password}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => setUser({ ...user, password: text })}
//       />
//       <TextInput
//         style={styles.input}
//         value={user.firstname}
//         placeholder="First Name"
//         onChangeText={(text) => setUser({ ...user, firstname: text })}
//       />
//       <TextInput
//         style={styles.input}
//         value={user.lastname}
//         placeholder="Last Name"
//         onChangeText={(text) => setUser({ ...user, lastname: text })}
//       />
//       <Button title="Update Profile" onPress={handleUpdate} />
//       <Button title="Delete Profile" onPress={handleDelete} color="red" />
//     </View>
//   );
// };

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
    } else {
      await AsyncStorage.removeItem("token");
    }
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome5 name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      <Pressable onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  },
});

export default ProfileScreen;
