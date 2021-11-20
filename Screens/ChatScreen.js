import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChatScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
