import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
// import firebase from "../Firebase";

function RegistrationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back To Login",
    });
  }, [navigation]);

  //   const register = () => {
  //     auth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((authUser) => {
  //         authUser.user.updateProfile({
  //           displayName: name,
  //           photoUrl: imageURL,
  //         });
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //   };

  const SignUp = async () => {
    // try {
    //   await firebase.auth().createUserWithEmailAndPassword(email, password);
    // } catch (err) {
    //   alert(err.message);
    // }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.Container}>
        <StatusBar style="light" />
        <View Style={{ textAlign: "center" }}>
          <Text h2 style={{ paddingBottom: 50 }}>
            Join your Colleagues
          </Text>
          <Text
            style={{ textAlign: "center", paddingBottom: 20, fontSize: 17 }}
          >
            Communication made easy at your convenience
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            type="Password"
            secureTextEntry={true}
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Input
            type="text"
            placeholder="Profile picture imageURL (optional)"
            value={imageURL}
            onChangeText={(text) => setImageURL(text)}
            onSubmitEditing={SignUp}
          />
        </View>

        <Button
          raised
          title="register"
          containerStyle={styles.button}
          onPress={SignUp}
        />
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 15 }}>
            Already have an account?
          </Text>
          <Button
            title="login"
            containerStyle={styles.button2}
            raised
            type="outline"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#ffff",
  },
  inputContainer: {
    width: 310,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  button2: {
    marginLeft: 6,
  },
});
