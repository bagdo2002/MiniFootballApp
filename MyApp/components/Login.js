import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { AuthProvider, useAuth } from "./AuthContext";

export default function Login({ navigation, setIsLogedIn }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authentication = FIREBASE_AUTH;

  const handlePressOutsideKeyboard = () => {
    Keyboard.dismiss();
  };

  const signin = async () => {
    setLoading(true);
    try {
      if (email && password) {
        const response = await signInWithEmailAndPassword(
          authentication,
          email,
          password
        );
        console.log(response);
        const username = email; // Replace this with the actual captured username
        console.log(response);
        console.log(username);

        // Store the username in AsyncStorage
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("id", response.user.uid);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("logedIn", JSON.stringify(true));
        setIsLogedIn(true);
      }
    } catch (error) {
      console.log(error);
      alert("Failed" + error.message);
    } finally {
      setLoading(false);
      // setEmail("");
      // setPassword("");
    }
  };

  const saveValueFunction = () => {
    if (email) {
      AsyncStorage.setItem("any_key_here", email);
      setEmail("");
    }

    if (password) {
      AsyncStorage.setItem("any_key_here2", password);
      setPassword("");
    }
    getValueFunction();
  };

  const getValueFunction = async () => {
    if (email == null && password == null) {
      handleLogin();
    } else {
      if (email) {
        AsyncStorage.getItem("any_key_here", email);
        setEmail("");
      }

      if (password) {
        AsyncStorage.getItem("any_key_here2", password);
        setPassword("");
      }
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
    }
  };

  return (
    <ScrollView onPress={handlePressOutsideKeyboard}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        ) : (
          <View style={styles.buttonContainer}>
            <View style={styles.innerCont}>
              <TouchableOpacity
                onPress={signin}
                style={[styles.button, styles.signInButton]}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={signup}
                style={[styles.button, styles.signUpButton]}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity> */}
            </View>
            <Text style={styles.createAccountText}>
              Don't have an account?
              <Text
                style={{ color: "#FF204E" }}
                onPress={() => navigation.navigate("SignUpp")}
              >
                <></> Create one
              </Text>
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  createAccountText: {
    width: "100%",
    textAlign: "start",
    fontSize: 16,
    color: "#777",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    width: "48%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  innerCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "#4CAF50",
  },
  signUpButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
});
