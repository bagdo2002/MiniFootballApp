import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

const arrCities = ["თბილისი", "ბათუმი", "ქუთაისი", "რუსთავი", "გორი"];

export default function SignUp({ navigation }) {
  const [information, setInformation] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    street: "",
    city: "",
    ball: false,
  });
  const [image, setImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);
  const bioInputRef = useRef(null);

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

  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        information.email,
        information.password
      );
      console.log(response);
      alert("Signed up successfully!");
      await AsyncStorage.setItem("email", information.email);
      await AsyncStorage.setItem("password", information.password);

      await AsyncStorage.setItem("street", information.street);

      await AsyncStorage.setItem("ball", JSON.stringify(information.ball));
      await AsyncStorage.setItem("city", information.city);
      console.log(information);
      navigation.navigate("Login");
      // Additional data saving if needed
    } catch (error) {
      console.log(error);
      alert("Failed to sign up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleBall = () => {
    setInformation((prev) => ({
      ...prev,
      ball: !prev.ball,
    }));
  };

  const selectCity = (city) => {
    setInformation((prev) => ({
      ...prev,
      city,
    }));
    setShowDropdown(false);
  };

  const handlePressOutsideKeyboard = () => {
    if (nameInputRef.current) {
      nameInputRef.current.blur();
    }
    if (bioInputRef.current) {
      bioInputRef.current.blur();
    }
    Keyboard.dismiss();
  };

  const validatePassword = () => {
    if (information.password !== information.repeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  return (
    <ScrollView onPress={handlePressOutsideKeyboard}>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity style={styles.ImageBtn} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        <TextInput
          ref={nameInputRef}
          placeholder="Email"
          onChangeText={(email) =>
            setInformation((prev) => ({ ...prev, email }))
          }
          value={information.email}
          style={styles.input}
        />
        <TextInput
          ref={bioInputRef}
          placeholder="Password"
          // secureTextEntry={true}
          onChangeText={(password) =>
            setInformation((prev) => ({ ...prev, password }))
          }
          value={information.password}
          onBlur={validatePassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Repeat Password"
          // secureTextEntry={true}
          onChangeText={(repeatPassword) =>
            setInformation((prev) => ({ ...prev, repeatPassword }))
          }
          value={information.repeatPassword}
          onBlur={validatePassword}
          style={styles.input}
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
        <TextInput
          placeholder="Street"
          onChangeText={(street) =>
            setInformation((prev) => ({ ...prev, street }))
          }
          value={information.street}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.cityDropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>
            {information.city || "Select City"}
          </Text>
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            {arrCities.map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.dropdownItem}
                onPress={() => selectCity(city)}
              >
                <Text style={styles.dropdownText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity onPress={toggleBall} style={styles.checkbox}>
          <Text style={{ marginRight: 20 }}>ბურთი გაქვს?</Text>
          {information.ball ? (
            <Text style={{ color: "green" }}>კი</Text>
          ) : (
            <Text style={{ color: "red" }}>არა</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={signup} style={styles.button}>
          <Text style={styles.buttonText2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20, // Adjust the top padding as needed
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#0E46A3", // Messenger blue color
    padding: 12, // Increased padding for better touch target
    borderRadius: 5, // Increased border radius for a rounded shape
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText2: {
    color: "#fff", // White text color for better contrast
    fontSize: 16,
    fontWeight: "bold", // Bold text for emphasis
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    resizeMode: "cover", // Adjust as needed
    marginTop: 20,
  },
  ImageBtn: {
    padding: 10,

    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  cityDropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  dropdownContainer: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the start
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },

  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff", // Add a background color for better readability
  },
  dropdownText: {
    
    fontSize: 16,
    color: "#333", // Change text color for better contrast
  },
};




// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Image,
//   Button,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { FIREBASE_AUTH, db, colRef, refGroup } from "./firebaseConfig";
// import { addDoc, doc, onSnapshot, setDoc } from "firebase/firestore";

// const arrCities = ["თბილისი", "ბათუმი", "ქუთაისი", "რუსთავი", "გორი"];

// export default function SignUp({ navigation }) {
//   const [groupsCollectionRef, setGroupsCollectionRef] = useState(refGroup);
//   const [id, setId] = useState("");
//   const [groups, setGroups] = useState([]);
//   const idd = async () => {
//     let data = await AsyncStorage.getItem("id");
//     return data;
//   };
//   useEffect(() => {
//     const unsubscribe = onSnapshot(refGroup, (groups) => {
//       console.log("Current groups in database: ", groups);
//       const groupsData = groups.docs.map((doc) => {
//         return { id: doc.id, ...doc.data() };
//       });
//       console.log("Current groups in database: ", groupsData);

//       setGroups(groupsData);
//     });
//     idd().then((res) => setId(res));
//     return unsubscribe;
//   }, []);
//   const startGroup = async () => {
//     try {
//       await addDoc(groupsCollectionRef, {
//         name: `Group #${Math.floor(Math.random() * 1000)}`,
//         description: "This is a chat group Luka",
//         creator: id,
//       });
//       console.log("???");
//     } catch (error) {
//       console.log("error creating group", error);
//     }
//   };
//   return (
//     <ScrollView>
//       <View>
//         {groups.map((group) => (
//           <TouchableOpacity style={styles.groupCard} key={group.id}>
//             <Text>{group.name}</Text>
//             <Text>{group.description}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.fab} onPress={() => startGroup()}>
//         <Button title="add" size={24} color="black" />
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   fab: {
//     position: "absolute",
//     width: 56,
//     height: 56,
//     alignItems: "center",
//     justifyContent: "center",
//     right: 20,
//     bottom: 20,
//     backgroundColor: "red",
//     borderRadius: 30,
//     elevation: 8,
//   },
//   groupCard: {
//     padding: 10,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//     elevation: 4,
//   },
// });
