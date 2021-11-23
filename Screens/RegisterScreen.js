import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth, db } from "../fb";
import moment from "moment";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
        });
        db.collection("users").doc(auth.currentUser.uid).set({
          name,
          email,
          imageUri: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
          userId: auth.currentUser.uid,
          lastOnlineAt: moment().format(),
        });
        db.collection("AddedTo")
          .doc(auth.currentUser.uid)
          .set({
            users: [auth.currentUser.uid],
          });
        console.log(authUser?.user?.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Platform.OS != "web" ? Keyboard.dismiss() : null;
      }}
    >
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.button2}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

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
    color: "#dfa249",
  },
});
