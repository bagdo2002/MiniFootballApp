import React, { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Button,
  Image,
  Modal,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_AUTH } from "./firebaseConfig";
import barca from "../Images/soccerTeams/barca.jpg";
import real from "../Images/soccerTeams/real.jpg";
import team1 from "../Images/soccerTeams/team1.jpg";
import team2 from "../Images/soccerTeams/team2.jpg";
import Tactics from "./Tactics";
import Map from "./Map";
import FieldDisplay from "./FieldDisplay";

export default function ProfileSettings({ navigation, setIsLogedIn }) {
  const [image, setImage] = useState(null);

  const [chosen, setChosen] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");

  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [teamName, setTeamName] = useState("");
  const [bio, setBio] = useState("");
  const nameInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [fieldStreet, setFieldStreet] = useState("ნახალოვკა");
  const [tactics, setTactics] = useState("3-1-1");

  const [selectedTeam, setSelectedTeam] = useState(null);

  const soccerTeams = [
    { name: "Barcelona", image: barca },
    { name: "Real Madrid", image: real },
    { name: "Team 1", image: team1 },
    { name: "Team 2", image: team2 },
  ];
  useEffect(() => {
    const getUsername = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const imagestored = await AsyncStorage.getItem("image");
        if (imagestored) {
          setImage(imagestored);
        }
        if (username) {
          setName(username);
        }
      } catch (error) {
        console.log("Error retrieving username from AsyncStorage:", error);
      }
    };

    getUsername();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await AsyncStorage.setItem("image", result.assets[0].uri);
    }
  };
  const handleCreateTeam = () => {
    // Create an object containing the data to send to the server
    const dataToSend = {
      email: email,
      name: name2,
      teamName: teamName,
      numberOfPlayers: numberOfPlayers,
      selectedTeam: selectedTeam.image,
      tactics: tactics,
      fieldStreet: fieldStreet,
    };

    // Update the API URL to use the ngrok URL
    const apiUrl = "https://1fa0-31-146-87-162.ngrok-free.app/submitForm";

    console.log("API URL:", apiUrl);

    fetch(apiUrl, {
      // Use the ngrok URL here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        setIsModalVisible(false);
        setIsModalVisible2(false);
        setIsModalVisible3(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.ImageBtn}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    ),
  });
  
  const saveProfile = () => {
    console.log("Name:", name);
    console.log("Bio:", bio);
    console.log("Image:", image);
  };

  const handlePressOutsideKeyboard = () => {
    if (nameInputRef.current) {
      nameInputRef.current.blur();
    }
    if (bioInputRef.current) {
      bioInputRef.current.blur();
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.setItem("logedIn", "");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("password");
    setIsLogedIn(true);
    await FIREBASE_AUTH.signOut(); // Wait for sign-out to complete
  };

  const handleTeamSelect = (team, index) => {
    setSelectedTeam(team);
    setChosen(index);
  };

  return (
    <ScrollView onPress={handlePressOutsideKeyboard}>
      <Button
        title="TeamDisplay"
        onPress={() => navigation.navigate("TeamDisplay")}
      />
      <View style={styles.container}>
        <View style={styles.profile}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.innerProfile}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>ლუკა ბაღდავაძე</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ImageBtn} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleSignOut}
            styles={{ color: "red" }}
            style={[styles.button, styles.signOutButton]}
          >
            <Text style={styles.buttonText2}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {soccerTeams.map((team, index) => (
              <TouchableOpacity
                key={index}
                style={styles.teamItem}
                onPress={() => handleTeamSelect(team, index)}
              >
                <Image source={team.image} style={styles.teamImage} />
                <View
                  style={{
                    width: "55%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.teamName}>{team.name}</Text>
                  {index === chosen && (
                    <Text style={{ color: "green" }}>Selected</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name2}
              onChangeText={(text) => setName2(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Players"
              value={numberOfPlayers}
              onChangeText={(text) => setNumberOfPlayers(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Team Name"
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
            />
            <TouchableOpacity
              style={styles.Next}
              onPress={() => {
                setIsModalVisible2(true), setIsModalVisible(false);
              }}
            >
              <Text style={styles.createButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton2}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.createButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible2}
        onRequestClose={() => setIsModalVisible2(false)}
      >
        <View style={styles.tacticsModalContainer}>
          <View style={styles.tacticsModalContent}>
            <Tactics setTactics={setTactics} style={styles.tactics} />
            <TouchableOpacity
              style={styles.Next}
              onPress={() => {
                setIsModalVisible3(true), setIsModalVisible2(false);
              }}
            >
              <Text style={styles.createButtonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton2}
              onPress={() => setIsModalVisible2(false)}
            >
              <Text style={styles.createButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible3}
        onRequestClose={() => setIsModalVisible3(false)}
      >
        <View style={styles.FieldCont}>
          <View style={styles.FieldInn}>
            <FieldDisplay
              setFieldStreet={setFieldStreet}
              navigation={navigation}
            />
            {/* <TouchableOpacity
              style={styles.Next}
              onPress={() => {
                setIsModalVisible3(true), setIsModalVisible2(false);
              }}
            >
              <Text style={styles.createButtonText}>Next</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.createButton2}
              onPress={() => {
                setIsModalVisible3(false),
                  setIsModalVisible2(false),
                  setIsModalVisible(false);
              }}
            >
              <Text style={styles.createButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateTeam}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Next: {
    backgroundColor: "#0E46A3",
    padding: 10,
    marginTop: 10,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20, // Adjust the top padding as needed
    paddingHorizontal: 20,
    flex: 1,
  },
  ImageBtn: {},
  profile: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20, // Add margin bottom to create space between profile and buttons
  },
  buttonsContainer: { marginTop: 100 },
  innerProfile: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
  },

  button: {
    paddingHorizontal: 140,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    color: "red",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonText2: {
    fontSize: 16,
    color: "red",
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: "grey",
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "grey",
  },
  email: {
    color: "grey",
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 10,
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  tacticsModalContainer: {
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  tacticsModalContent: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 70,
    borderRadius: 10,
    width: "95%",
    height: "60%",
  },
  FieldCont: {
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  FieldInn: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 70,
    borderRadius: 10,
    width: "95%",
    height: "80%",
  },
  tactics: {},
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  createButton: {
    backgroundColor: "#0E46A3",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButton2: {
    backgroundColor: "#E72929",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  ImageBtn: {
    marginRight: 15,
  },
});
