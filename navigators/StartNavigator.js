import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import StartScreen from "../Screens/StartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StartNavigator({ isAppFirstStart }) {
  const putIsAppFirstStart = () => {
    AsyncStorage.setItem("storedAppFirstStart", JSON.stringify(false)).catch(
      (error) => console.log(error)
    );
    // AsyncStorage.clear();
  };

  useEffect(() => {
    const unsubscribe = putIsAppFirstStart();
    return unsubscribe;
  }, []);

  const Stack = createStackNavigator();
  //   console.log(isAppFirstStart);

  if (isAppFirstStart) {
    return (
      <Stack.Navigator
        initialRouteName={"Start"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
