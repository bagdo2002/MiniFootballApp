import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import FieldDisplay from "./components/FieldDisplay";
import Messages from "./components/Messages";
import PlayerProfile from "./components/PlayerProfile";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import { Header } from "@rneui/base";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./components/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpp from "./components/SignUpp";
import Tactics from "./components/Tactics";
import TeamDisplay from "./components/TeamDisplay";
import MessageContainer from "./components/MessageContainer";
import ChatPage from "./components/chatPage";

const Stack = createNativeStackNavigator();
const insideStack = createNativeStackNavigator();

function InsideComponent({ setIsLogedIn }) {
  return (
    <View style={{ flex: 1 }}>
      <insideStack.Navigator initialRouteName="MessageContainer">
        <insideStack.Screen name="Tactics" component={Tactics} />
        <insideStack.Screen name="ChatPage" component={ChatPage} />
        <insideStack.Screen
          name="MessageContainer"
          component={MessageContainer}
        />
        <insideStack.Screen name="TeamDisplay" component={TeamDisplay} />
        <insideStack.Screen name="SignUpp" component={SignUpp} />
        <insideStack.Screen name="Messages" component={Messages} />

        <insideStack.Screen name="FieldDisplay" component={FieldDisplay} />
        <insideStack.Screen name="PlayerProfile" component={PlayerProfile} />
        <insideStack.Screen
          name="ProfilePage"
          options={{ headerTitle: "პარამეტრები" }}
          component={(props) => (
            <ProfilePage {...props} setIsLogedIn={setIsLogedIn} />
          )}
        />
      </insideStack.Navigator>
      <Navbar />
    </View>
  );
}

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  useEffect(() => {
    const check = async () => {
      let data = await AsyncStorage.getItem("logedIn");
      setIsLogedIn(data);
      console.log(data);
    };
    check();
  }, [isLogedIn]);
  console.log(isLogedIn);
  return (
    <NavigationContainer>
      {isLogedIn ? (
        <Stack.Navigator initialRouteName="Inside">
          <Stack.Screen
            name="Inside"
            options={{ headerShown: false }}
            component={() => <InsideComponent setIsLogedIn={setIsLogedIn} />}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={(props) => (
              <Login {...props} setIsLogedIn={setIsLogedIn} />
            )}
          />

          <Stack.Screen name="SignUpp" component={SignUpp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
