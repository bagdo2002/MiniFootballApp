import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const Navbar = () => {
  const navigation = useNavigation(); // Use useNavigation hook to access navigation

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("FieldDisplay")}>
          <MaterialCommunityIcons
            name="soccer-field"
            size={24}
            color="#31363F"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PlayerProfile")}>
          <FontAwesome5 name="user-friends" size={24} color="#31363F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
          <Entypo name="chat" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75, // Fixed height to maintain distance from bottom
    backgroundColor: "white",
    justifyContent: "flex-end", // Align items to the bottom
    paddingBottom: 20, // Padding to ensure content doesn't overlap Navbar
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default Navbar;
