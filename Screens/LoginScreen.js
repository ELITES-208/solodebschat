import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { Button, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const { width: WIDTH } = Dimensions.get("window");

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = () => {};

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Enter your email"}
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            type="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <Button
          containerStyle={styles.button}
          raised
          title="login"
          onPress={SignIn}
          //   onPress={() => navigation.navigate("Chats")}
        />
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text>Don't have an account ?</Text>
          <Button
            containerStyle={styles.button2}
            raised
            type="outline"
            title="Sign Up"
            onPress={() => navigation.goBack("Register")}
          />
        </View>
        <View style={{ height: 50 }} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#ffff",
  },
  inputContainer: {
    // width: 100,
  },
  input: {
    width: WIDTH - 60,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
    color: "yellow",
  },
  button2: {
    marginLeft: 10,
    color: "yellow",
  },
});
