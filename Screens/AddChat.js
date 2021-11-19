import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddChatItem from "../components/AddChatItem";
import UsersData from "../assets/dummy-data/Users";

export default function AddChat({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
      headerBackTitle: null,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <AddChatItem user={UsersData[0]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
