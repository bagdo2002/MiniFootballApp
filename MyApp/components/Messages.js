import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colRef } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  addDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

export default function Messages({ navigation }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState(null);
  const flatListRef = useRef(null); // Create a ref for FlatList

  const q = query(colRef, orderBy("createdAt", "asc"));
  const idFetch = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      console.log(id);
      return id; // Return an empty string if id is null or undefined
    } catch (error) {
      console.error("Error fetching ID from AsyncStorage:", error);
      return ""; // Return an empty string if an error occurs
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messagesStore = [];
      snapshot.docs.forEach((doc) => {
        messagesStore.push({ ...doc.data(), id: doc.id });
      });

      console.log(snapshot.docs);
      setMessages(messagesStore);
    });
    idFetch().then((res) => setId(res));
    // Ensure unsubscribe function is returned
    return unsubscribe;
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    try {
      const userId = await idFetch(); // Fetch the user id
      console.log("User ID:", userId); // Add this line to check the user id
      if (userId && message.length > 0) {
        // Check if message length is greater than 0
        await addDoc(colRef, {
          message: message,
          sender: userId, // Use the fetched user id as the sender
          createdAt: serverTimestamp(),
        });
        setMessage("");
      } else {
        console.log("Message is empty or invalid");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessages = (item) => {
    const myMessage = item.item.sender === id;
    console.log(item.item);
    console.log(item);
    return (
      <View
        style={[
          styles.messageContainer,
          myMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <Text
          style={[styles.messageText, { color: myMessage ? "#fff" : "#000" }]}
        >
          {item.item.message}
        </Text>
        <Text style={{ color: myMessage ? "white" : "grey", fontSize: 11 }}>
          {item.item.createdAt &&
            item.item.createdAt.toDate().toLocaleDateString()}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1, paddingHorizontal: 10, marginBottom: 85 }}
    >
      <FlatList
        ref={flatListRef} // Pass the ref to FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessages}
        onContentSizeChange={scrollToBottom} // Scroll to bottom on content size change
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setMessage(text)} // Bind to pages state
          value={message} // Use pages state as value
          placeholder="Message" // Add placeholder text
        />
        <Button title="Send" onPress={sendMessage} style={styles.sendButton} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 20, // Adjust as needed
    paddingHorizontal: 15,
  },
  sendButton: {
    backgroundColor: "#0084ff", // Facebook Messenger blue
    borderRadius: 20, // Same as TextInput
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userMessageContainer: {
    backgroundColor: "#0084ff", // Facebook Messenger user message color
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#e5e5ea", // Facebook Messenger other user message color
  },

  messageText: {
    fontSize: 16,
    color: "#000", // Default text color
  },

  time: {
    fontSize: 13,
    color: "black",
    alignSelf: "flex-end",
  },
});
