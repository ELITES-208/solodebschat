import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ImageBackground,
  Image,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { auth, db } from "../fb";
import moment from "moment";
import Color from "../assets/Color";

function RegisterScreen({ navigation }) {
  //States for textboxes//////////////////////////////
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  /////////////////////////////////////////////////////

  //Sign Up function///////////////////////////////////////
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
  /////////////////////////////////////////////////////////////

  //Function to validate text boxes/////////////////////////
  const onRegisterPress = () => {
    if (!name) {
      alert("Please enter your name");
    }
    if (name && !email) {
      alert("Please enter your e-mail");
    }
    if (name && email && !password) {
      alert("Please enter your password");
    }
    if (name && email && password && !confirmPassword) {
      alert("Please confirm your password");
    }
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password != confirmPassword
    ) {
      alert("The passwords do not match");
    }
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      SignUp();
    }
  };
  ////////////////////////////////////////////////////////////////

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Platform.OS != "web" ? Keyboard.dismiss() : null;
      }}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/start-bg.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <View style={styles.box}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/solodebs-logo.png")}
                  style={styles.image}
                />
              </View>
              <Text style={styles.textBig}>Join Your Colleagues</Text>
              <Text style={styles.textSmall}>
                Communication made easy at your convenience
              </Text>

              <View style={{ paddingTop: 30 }}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Your Full Name"
                    onChangeText={(text) => setName(text)}
                    value={name}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Your E-mail"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Your Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry
                  />
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.Button}
              onPress={() => onRegisterPress()}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.option}>
              <Text>Already have an account ? </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ color: Color.darkYellow }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    flex: 1,
    backgroundColor: Color.ash,
    marginHorizontal: 10,
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textBig: {
    color: Color.green,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  textSmall: {
    textAlign: "center",
    fontSize: 16,
  },
  inputContainer: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.lightYellow,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  Button: {
    backgroundColor: Color.lightYellow,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 10,
  },
  option: {
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
