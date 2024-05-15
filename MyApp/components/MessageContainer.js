import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GroupsPage = ({ navigation }) => {
  const [uId, setUId] = useState(null);

  const [groupsCollectionRef, setGroupsCollectionRef] = useState(null);
  const [groups, setGroups] = useState([]);
  const uIdFetch = async () => {
    const a = await AsyncStorage.getItem("id");
    return a;
  };
  useEffect(() => {
    uIdFetch().then((res) => setUId(res));

    const ref = collection(db, "groups");
    setGroupsCollectionRef(ref);

    const unsubscribe = onSnapshot(ref, (groups) => {
      console.log("Current groups in database: ", groups);
      const groupsData = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log("Current groups in database: ", groupsData);

      setGroups(groupsData);
    });

    return unsubscribe;
  }, []);
  const handleGroupPress = (groupId) => {
    navigation.navigate("ChatPage", { id: groupId });
  };

  const startGroup = async () => {
    try {
      await addDoc(groupsCollectionRef, {
        name: `Group #${Math.floor(Math.random() * 1000)}`,
        description: "This is a chat group",
        creator: uId,
      });
    } catch (error) {
      console.log("error creating group", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {groups.map((group) => (
          <Pressable
            key={group.id}
            style={styles.groupCard}
            onPress={() => handleGroupPress(group.id)}
          >
            <Text>{group.id}</Text>

            <Text>{group.description}</Text>
            <Text>{group.name}</Text>
            <Text>{group.creator}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={startGroup}>
        <Text>Create a new Group</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",

    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 200,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  groupCard: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 4,
  },
});

export default GroupsPage;
