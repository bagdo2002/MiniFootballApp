import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import field from "../Images/soccerTeams/football_field.jpg";
import halfPitch from "../Images/Fields/halfPitch.png";

const styles = StyleSheet.create({
  pitchContainer: {
    width: 355,
    height: 255,
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
  },
  pitchTitle: {
    color: "black",
    textAlign: "center",
    fontSize: 24,
  },
  pos: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#bdc3c7",
    color: "#34495e",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 24,
    fontWeight: "100",
    position: "absolute",
    transition: "background-color 0.3s linear",
    zIndex: 100,
  },
});

const Tactics = ({ style, setTactics }) => {
  const [formation, setFormation] = useState("3-1-1");
  const changeFormation = () => {
    switch (formation) {
      case "3-1-1":
        setFormation("2-2-1");
        setTactics("2-2-1");
        break;
      case "2-2-1":
        setFormation("1-3-1");
        setTactics("1-3-1");
        break;
      case "1-3-1":
        setFormation("3-1-1");
        setTactics("3-1-1");
        break;
      default:
        break;
    }
  };
  return (
    <View style={[styles2.container, style]}>
      <TouchableOpacity style={styles2.btn} onPress={changeFormation}>
        <Text style={styles.pitchTitle}>{formation}</Text>
      </TouchableOpacity>
      <View style={styles2.main}>
        {formation == "3-1-1" && (
          <View style={styles.pitchContainer}>
            <ImageBackground
              source={halfPitch}
              style={{ width: "100%", height: "100%", top: 0, left: 0 }}
            >
              <Text style={[styles.pos, { top: 1, left: "44.5%%" }]}>1</Text>

              <Text style={[styles.pos, { top: 90, left: "45%" }]}>6</Text>
              <Text style={[styles.pos, { top: 165, left: 50 }]}>8</Text>
              <Text style={[styles.pos, { top: 165, left: "45%" }]}>9</Text>
              <Text style={[styles.pos, { top: 165, right: 50 }]}>10</Text>
            </ImageBackground>
          </View>
        )}

        {formation == "2-2-1" && (
          <View style={styles.pitchContainer}>
            <ImageBackground
              source={halfPitch}
              style={{ width: "100%", height: "100%", top: 0, left: 0 }}
            >
              <Text style={[styles.pos, { top: 1, left: "44.5%%" }]}>1</Text>

              <Text style={[styles.pos, { top: 90, left: "33%" }]}>6</Text>
              <Text style={[styles.pos, { top: 90, right: "33%" }]}>8</Text>
              <Text style={[styles.pos, { top: 165, left: 50 }]}>9</Text>
              <Text style={[styles.pos, { top: 165, right: 50 }]}>10</Text>
            </ImageBackground>
          </View>
        )}
        {formation == "1-3-1" && (
          <View style={styles.pitchContainer}>
            <ImageBackground
              source={halfPitch}
              style={{ width: "100%", height: "100%", top: 0, left: 0 }}
            >
              <Text style={[styles.pos, { top: 1, left: "44.5%" }]}>1</Text>
              <Text style={[styles.pos, { top: 120, right: "75%" }]}>6</Text>
              <Text style={[styles.pos, { top: 70, left: "44%" }]}>8</Text>
              <Text style={[styles.pos, { top: 120, left: "75%" }]}>9</Text>
              <Text style={[styles.pos, { top: 195, right: "45%" }]}>10</Text>
            </ImageBackground>
          </View>
        )}
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 100,
    padding: 2,
    marginTop: 10,
    backgroundColor: "#F6F5F2",
  },
  main: {
    paddingVertical: 40,
    paddingHorizontal: 50,
  },
});

export default Tactics;
