import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../fb";

const lightYellow = "#fdd969";
const darkYellow = "#d9a754";

export default function MessageBox({ message }) {
  const currentUserId = auth.currentUser.uid;

  const { timeStamp, content, userDisplayName, userId, userImageUri } =
    message?.data;
  const date = timeStamp.toDate().toLocaleDateString();
  const time = timeStamp.toDate().toLocaleTimeString();

  const isMe = userId === currentUserId;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{content}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.timestamp}>{date}</Text>
        <Text style={styles.timestamp}>{time}</Text>
      </View>
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
    marginRight: 8,
  },
  timestamp: { color: "#f2f2f2", fontSize: 10, paddingHorizontal: 5 },
});
