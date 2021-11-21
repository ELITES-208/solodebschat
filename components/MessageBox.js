import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { auth } from "../fb";

const lightYellow = "#fdd969";
const darkYellow = "#d9a754";

export default function MessageBox({ message }) {
  const currentUserId = auth.currentUser.uid;
  const { width } = useWindowDimensions();

  const {
    timeStamp,
    content,
    userDisplayName,
    userId,
    userImageUri,
    imageContent,
  } = message?.data;
  const time = timeStamp
    ?.toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isMe = userId === currentUserId;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      {imageContent && (
        <View style={{ marginBottom: content ? 10 : 2 }}>
          <Image
            source={{ uri: imageContent }}
            style={{
              width: width * 0.7,
              aspectRatio: 4 / 3,
            }}
            resizeMode="contain"
          />
        </View>
      )}
      {content && <Text style={{ color: "white" }}>{content}</Text>}
      <View>
        <Text
          style={[styles.timestamp, isMe ? styles.rightTime : styles.leftTime]}
        >
          {time}
        </Text>
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
  timestamp: { color: "#f2f2f2", fontSize: 10, paddingHorizontal: 2 },
  rightTime: {
    textAlign: "right",
  },
  leftTime: {
    textAlign: "left",
  },
});
