import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Color from "../assets/Color";

function StartScreen({ navigation }) {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/start-bg.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/solodebs-logo.png")}
              style={[
                styles.image,
                {
                  width: width * 0.6,
                  height: width * 0.6,
                  borderRadius: width,
                },
              ]}
            />
          </View>
          <Text style={styles.text}>Welcome to SoloChat</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Button}
          onPress={() => navigation.replace("Register")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  image: {
    backgroundColor: "white",
  },
  text: {
    color: Color.green,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
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
});
