import {
  View,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatPage = () => {
  const [uId, setUId] = useState(null);
  const route = useRoute(); // Hook to get the route object
  const { id } = route.params; // Accessing the id parameter from route.params
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const uIdFetch = async () => {
    const a = await AsyncStorage.getItem("id");
    return a;
  };
  useLayoutEffect(() => {
    uIdFetch().then((res) => setUId(res));
    const msgCollectionRef = collection(db, `groups/${id}/messages`);
    // const q = query(msgCollectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(msgCollectionRef, (groups) => {
      const messages = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      console.log(messages);
      setMessages(messages);
    });

    return unsubscribe;
  }, []);
  const sendMessage = async () => {
    const msg = message.trim();
    if (msg.length === 0) return;
    const msgCollectionRef = collection(db, `groups/${id}/messages`);
    await addDoc(msgCollectionRef, {
      text: msg,
      sender: uId,
      createdAt: serverTimestamp(),
    });
    let obj = { text: msg, sender: uId, createdAt: serverTimestamp() };
    console.log(obj);
    setMessage("");
  };
  const renderMessage = ({ item }) => {
    // Determine if the message is sent by the current user
    const myMessage = item.sender === "aVXQ6Zcr34YOju9pcpK5tEWhj032"; // Replace '11111' with the current user's ID

    return (
      <View
        style={[
          styles.messageContainer,
          myMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.time}>
          {item.createdAt ? item.createdAt.toDate().toLocaleDateString() : ""}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        // keyExtractor={(item) => item.id}
        renderItem={renderMessage}
      />
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message"
          asd
          style={styles.messageInput}
        />
        <Button
          disabled={message === ""}
          title="Send"
          onPress={() => sendMessage()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 70,

    gap: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#777",
    alignSelf: "flex-end",
  },
});

export default ChatPage;
