import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import barca from "../Images/soccerTeams/barca.jpg";
import real from "../Images/soccerTeams/real.jpg";
import team1 from "../Images/soccerTeams/team1.jpg";
import team2 from "../Images/soccerTeams/team2.jpg";
import Map from "./Map";
import FieldDisplay from "./FieldDisplay";

export default function TeamDisplay() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 41.7408966, // Default latitude
    longitude: 44.739928, // Default longitude
  });
  const soccerTeams = [
    { name: "Barcelona", image: barca, id: 40 },
    { name: "Real Madrid", image: real, id: 41 },
    { name: "Team 1", image: team1, id: 42 },
    { name: "Team 2", image: team2, id: 43 },
  ];
  const getTeam = () => {
    const apiUrl = "https://1fa0-31-146-87-162.ngrok-free.app/submittedData";

    return fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setData(data); // Update state directly without wrapping in an array
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getTeam();
  }, []);

  const openModal = (team) => {
    setSelectedTeam(team);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {data?.map((team) => {
        const { id, selectedTeam } = team;
        const selectedImage = soccerTeams.find(
          (team) => team.id === selectedTeam
        )?.image;
        return (
          <View key={id}>
            <TouchableOpacity
              onPress={() => openModal(team)}
              style={styles.card}
            >
              <Image source={selectedImage} style={styles.image} />
              <View style={styles.textContainer}>
                <Text>Name: {team.name}</Text>
                <Text>TeamName: {team.teamName}</Text>
                <Text>Email: {team.email}</Text>
                <Text>numberOfPlayers: {team.numberOfPlayers}</Text>
                <Text>tactics: {team.tactics}</Text>
                <Text>fieldStreet: {team.fieldStreet}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShow}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Name: {selectedTeam?.name}</Text>
            <Text style={styles.modalText}>
              Team Name: {selectedTeam?.teamName}
            </Text>
            <Text style={styles.modalText}>Email: {selectedTeam?.email}</Text>
            <Text style={styles.modalText}>
              Number of Players: {selectedTeam?.numberOfPlayers}
            </Text>
            <Text style={styles.modalText}>
              Tactics: {selectedTeam?.tactics}
            </Text>
            <Text style={styles.modalText}>
              Field Street: {selectedTeam?.fieldStreet}
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "green",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
