import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../fb";

const lightYellow = "#fdd969";
const darkYellow = "#d9a754";

export default function MessageBox({ message }) {
  const currentUserId = auth.currentUser.uid;

  const { timeStamp, content, userDisplayName, userId, userImageUri } =
    message?.data;

  const isMe = userId === currentUserId;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text style={{ color: "white" }}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  leftContainer: {
    backgroundColor: lightYellow,
    marginLeft: 10,
    marginRight: "auto",
  },
  rightContainer: {
    backgroundColor: darkYellow,
    marginLeft: "auto",
    marginRight: 10,
  },
});
