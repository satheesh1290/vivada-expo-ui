// src/screens/SignIn.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../components/mutations/login_mutation";
import SIGNUP_MUTATION from "../components/mutations/signup_mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setToken = async (token) => {
  if (Platform.OS === "web") {
    localStorage.setItem("token", token);
  } else {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error setting token in AsyncStorage:", error);
    }
  }
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useMutation(SIGNUP_MUTATION);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await login({
        variables: {
          email: email,
          password: password,
        },
      });
      console.log(result.data);
      let resToken = result.data.tokenAuth["token"];
      // await AsyncStorage.setItem("token", result.data.login.token);
      // await AsyncStorage.setItem("token", resToken);
      await setToken(resToken);
      setEmail("");
      setPassword("");
      router.replace("/home");
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await signup({
        variables: {
          email: email,
          password: password,
          username: email,
        },
      });
      console.log(result.data);
      // await AsyncStorage.setItem("token", result.data.signup.token);
      await setToken(result.data.signup.token);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      router.replace("/home");
    } catch (e) {
      console.error("Signup error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      {/* {isSignUp && (
        <>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
        </>
      )} */}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isSignUp ? (
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          disabled={signupLoading}
        />
      ) : (
        <Button
          title="Sign In"
          onPress={handleSignIn}
          disabled={loginLoading}
        />
      )}
      {loginError && <Text>{loginError.message}</Text>}
      {signupError && <Text>{signupError.message}</Text>}
      {/* {loginData && <Text>Welcome, {loginData.login.user.email}!</Text>} */}
      {loginData && <Text>Welcome, {loginData.tokenAuth.user.email}!</Text>}
      {signupData && (
        <Text>Account created for {signupData.signup.user.email}!</Text>
      )}
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.switchText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  switchText: {
    marginTop: 16,
    color: "blue",
    textAlign: "center",
  },
});

export default SignIn;
