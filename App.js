import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screens/StartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ChatScreen from "./Screens/ChatScreen";
import { auth } from "./fb";

const Stack = createStackNavigator();

const globalScreenOption = {
  headerStyle: {
    backgroundColor: "#dfa249",
  },
  headerTitleStyle: {
    color: "#fff",
  },
  headerTintColor: "#fff",
};
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName={"Start"}
          screenOptions={globalScreenOption}
        >
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName={"Chat"}
        screenOptions={globalScreenOption}
      >
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
