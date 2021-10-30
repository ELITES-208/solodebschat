import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h3>Welcome to SoloChat</Text>

      <Button
        title="Get Started"
        onPress={() => navigation.navigate("Register")}
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
});
