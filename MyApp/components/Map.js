import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function Map({ coordinates, setMapshow }) {
  const coordinate = {
    latitude: coordinates.latitude, // Latitude received as prop
    longitude: coordinates.longitude, // Longitude received as prop
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    closeBtn: {
      backgroundColor: "green", // Soft yellow background color
    },
    button: {
      backgroundColor: "white", // Soft yellow background color
      borderRadius: 10, // Rounded corners
      padding: 10, // Padding around the button text
      marginTop: 10, // Spacing from the top
    },
  });

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={coordinate} title="Your Location" />
        <TouchableOpacity
          onPress={() => navigateToMap(41.7408966, 44.739928)}
          style={styles.closeBtn}
        >
          <Button
            onPress={() => setMapshow(false)}
            title="Close Map"
            color="#fff" // Set the color to a soft yellow
            style={styles.button} // Apply custom styles
          />
        </TouchableOpacity>
      </MapView> */}
    </View>
  );
}
