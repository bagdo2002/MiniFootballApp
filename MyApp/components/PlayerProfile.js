import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import luka from "../Images/luka.jpg";
import { Card } from "@rneui/themed";
import luka2 from "../Images/luka2.jpg";
import { ScrollView } from "react-native";
import { Button } from "@rneui/base";

const Dropdown = ({ options, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.dropdownButton}
      >
        <Text style={styles.selectedOption}>{selectedOption}</Text>
      </TouchableOpacity>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.modalBackground}
        >
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.option}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const streets = ["ნახალოვკა", "ვარკეთილი", "ისანი", "ავლაბარი"];

export default function PlayerProfile() {
  const [selectedStreet, setSelectedStreet] = useState(streets[0]);

  const onPress = () => {
    console.log("Chat button pressed");
  };

  return (
    <ScrollView>
      <Dropdown
        options={streets}
        onSelect={(option) => setSelectedStreet(option)}
      />

      {selectedStreet === "ნახალოვკა" && (
        <Card id="ნახალოვკა" containerStyle={{}} wrapperStyle={{}}>
          <Card.Title>Luka</Card.Title>
          <Card.Divider />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100, marginRight: 10 }}
              resizeMode="contain"
              source={luka}
            />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16 }}>პოზიცია: თავდამსხმელი</Text>
              <Text style={{ fontSize: 16 }}>ბურთი: მაქვს</Text>
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      {selectedStreet === "ვარკეთილი" && (
        <Card id="ვარკეთილი" containerStyle={{}} wrapperStyle={{}}>
          <Card.Title>NIka</Card.Title>
          <Card.Divider />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100, marginRight: 10 }}
              resizeMode="contain"
              source={luka2}
            />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16 }}>პოზიცია: თავდამსხმელი</Text>
              <Text style={{ fontSize: 16 }}>ბურთი: მაქვს</Text>
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      {selectedStreet === "ისანი" && (
        <>
          <Card id="ისანი" containerStyle={{}} wrapperStyle={{}}>
            <Card.Title>Dato</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100, marginRight: 10 }}
                resizeMode="contain"
                source={luka}
              />
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 16 }}>პოზიცია: თავდამსხმელი</Text>
                <Text style={{ fontSize: 16 }}>ბურთი: მაქვს</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text style={styles.text}>Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
          <Card id="ისანი" containerStyle={{}} wrapperStyle={{}}>
            <Card.Title>Gega</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100, marginRight: 10 }}
                resizeMode="contain"
                source={luka2}
              />

              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 16 }}>პოზიცია: თავდამსხმელი</Text>
                <Text style={{ fontSize: 16 }}>ბურთი: მაქვს</Text>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text style={styles.text}>Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  dropdownButton: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    backgroundColor: "#BED7DC",
    borderColor: "black",
    borderRadius: 5,
  },
  selectedOption: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
