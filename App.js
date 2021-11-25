import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./Screens/MainScreen";
import { auth } from "./fb";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import AddChat from "./Screens/AddChat";
import ChatScreen from "./Screens/ChatScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import EditNameScreen from "./Screens/EditNameScreen";
import StartNavigator from "./navigators/StartNavigator";

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
  //Async storage to check app first start////////////////////
  const [ready, setReady] = useState(false);
  const [isAppFirstStart, setIsAppFirstStart] = useState(true);

  const getIsAppFirstStart = () => {
    AsyncStorage.getItem("storedAppFirstStart")
      .then((data) => {
        if (data) {
          setIsAppFirstStart(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  ////////////////////////////////////////////////////////////

  //Authentication Listener///////////////////////////////////
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
  ///////////////////////////////////////////////////////////

  if (!ready) {
    return (
      <AppLoading
        startAsync={getIsAppFirstStart}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  if (!loggedIn && ready) {
    return (
      <NavigationContainer>
        <StatusBar style="light" />
        <StartNavigator isAppFirstStart={isAppFirstStart} />
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
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
          <Stack.Screen name="Edit Name" component={EditNameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
