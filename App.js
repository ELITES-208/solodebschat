import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screens/StartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import MainScreen from "./Screens/MainScreen";
import { auth } from "./fb";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LogBox } from "react-native";
import AddChat from "./Screens/AddChat";
import ChatScreen from "./Screens/ChatScreen";

LogBox.ignoreLogs(["Setting a timer"]);

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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName={"Main"}
          screenOptions={globalScreenOption}
        >
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="AddChat" component={AddChat} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
