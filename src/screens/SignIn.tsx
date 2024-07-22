import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../components/mutations/login_mutation";
import SIGNUP_MUTATION from "../components/mutations/signup_mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/auth/auth.store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isSubmittingForm, isLoggedIn, currentMember } = useAuthStore(
    (state) => ({
      login: state.login,
      isSubmittingForm: state.isSubmittingForm,
      isLoggedIn: state.isLoggedIn,
      currentMember: state.currentMember,
    })
  );
  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useMutation(SIGNUP_MUTATION);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await login({ email, password });
      const { isLoggedIn, currentMember } = useAuthStore.getState();
      if (isLoggedIn) {
        setEmail("");
        setPassword("");
        console.log(currentMember);
        router.replace("/home");
      }
    } catch (e) {
      console.error("Login error:", e);
    } finally {
      setIsLoading(false);
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
      // await setToken(result.data.signup.token);
      setEmail("");
      setPassword("");
      router.replace("/home");
    } catch (e) {
      console.error("Signup error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputMode="email"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : isSignUp ? (
        <Pressable onPress={handleSignUp} disabled={isSubmittingForm}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleSignIn} disabled={isSubmittingForm}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      )}
      <Pressable onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.switchText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </Pressable>
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
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default SignIn;
