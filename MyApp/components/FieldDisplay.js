import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import isani from "../Images/Fields/isani.jpg";
import avlabari from "../Images/Fields/avlabari.jpg";
import nadzaladevi from "../Images/Fields/nadzaladevi.jpg";

// Remove the line importing Carousel and Pagination

import one from "../Images/one.jpeg";
import two from "../Images/two.jpeg";
import three from "../Images/three.jpeg";
import four from "../Images/four.jpeg";
import five from "../Images/five.jpeg";
import six from "../Images/six.jpeg";
import locationIcon from "../Images/location.png";

import { Picker } from "@react-native-picker/picker";
import Map from "./Map";

const { width: screenWidth } = Dimensions.get("window");

export default function FieldDisplay({ navigation, setFieldStreet }) {
  const handleCardPress = () => {};

  const streets = ["ნახალოვკა", "ვარკეთილი", "ისანი", "ავლაბარი"];

  const navigateToMap = (latitude, longitude) => {
    setMapshow(true);
  };

  const carousel1Data = [one, two, three];
  const carousel3Data = [isani];
  const carousel4Data = [avlabari];
  const carousel5Data = [nadzaladevi];

  const [activeIndex, setActiveIndex] = useState(0);
  const [mapshow, setMapshow] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState(streets[0]);
  const [coordinates, setCoordinates] = useState({
    latitude: 41.7408966, // Default latitude
    longitude: 44.739928, // Default longitude
  });
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card} onPress={handleCardPress}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  const filteredCarouselData = () => {
    switch (selectedStreet) {
      case "ნახალოვკა":
        if (setFieldStreet) {
          setFieldStreet("ნახალოვკა");
        }
        return carousel5Data;
      case "ვარკეთილი":
        if (setFieldStreet) {
          setFieldStreet("ვარკეთილი");
        }
        return carousel1Data;
      case "ისანი":
        if (setFieldStreet) {
          setFieldStreet("ისანი");
        }
        return carousel3Data;
      case "ავლაბარი":
        if (setFieldStreet) {
          setFieldStreet("ავლაბარი");
        }
        return carousel4Data;
      default:
        return [];
    }
  };

  return (
    <>
      {mapshow ? (
        <View style={styles.containerMap}>
          <Map coordinates={coordinates} setMapshow={setMapshow} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Picker
            selectedValue={selectedStreet}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedStreet(itemValue)}
          >
            {streets.map((street, index) => (
              <Picker.Item label={street} value={street} key={index} />
            ))}
          </Picker>
          <View style={styles.carouselContainer}>
            <View style={styles.carouselBox}>
              {/* Removed Carousel component */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: "row" }}
              >
                {filteredCarouselData().map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={handleCardPress}
                    style={styles.card}
                  >
                    <Image source={item} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* Removed Pagination component */}
            </View>
            <TouchableOpacity
              onPress={() => navigateToMap(41.7408966, 44.739928)}
              style={styles.buttonContainer}
            >
              <Image source={locationIcon} style={styles.icon} />
              <Text style={styles.buttonText}>Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  carouselContainer: {
    marginTop: 200,
  },
  carouselBox: {
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  paginationDot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#fff", // Active dot color
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
});
