import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h1 style={{ textAlign: "center" }}>
        Welcome to SoloChat
      </Text>

      <Button
        containerStyle={styles.button}
        title="Get Started"
        onPress={() => navigation.replace("Register")}
      />
    </View>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    marginTop: 50,
  },
});
