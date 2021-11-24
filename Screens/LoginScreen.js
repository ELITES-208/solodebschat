import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Text,
  Image,
} from "react-native";

import { auth } from "../fb";
import Color from "../assets/Color";

function LoginScreen({ navigation }) {
  //States for Login/////////////////////////////////////////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  ////////////////////////////////////////////////////////

  //Sign in function////////////////////////////////////////
  const SignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser?.user?.email);
      })
      .catch((error) => alert(error.message));
  };
  //////////////////////////////////////////////////////////

  //Function to validate text boxes/////////////////////////
  const onLoginPress = () => {
    if (!email) {
      alert("Please enter your e-mail");
    }
    if (email && !password) {
      alert("Please enter your password");
    }
    if (email && password) {
      SignIn();
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
              <Text style={styles.textBig}>Welcome Back!</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/solodebs-logo.png")}
                  style={styles.image}
                />
              </View>
              <View style={{ paddingTop: 30 }}>
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
              </View>
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.Button}
              onPress={() => onLoginPress()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.option}>
              <Text>Don't have an account ? </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={{ color: Color.darkYellow }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

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
  textBig: {
    color: Color.green,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    borderRadius: 100,
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
