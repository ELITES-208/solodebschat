import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { auth, db } from "../fb";
import firebase from "firebase/compat/app";
import Color from "../assets/Color";
import { useNavigation } from "@react-navigation/native";

export default function MessageBox({ message, chatRoomId }) {
  const navigation = useNavigation();

  const currentUserId = auth.currentUser.uid;
  const { width } = useWindowDimensions();

  const {
    timeStamp,
    content,
    userDisplayName,
    userId,
    userImageUri,
    imageContent,
    seenBy,
  } = message?.data;
  const time = timeStamp
    ?.toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isMe = userId === currentUserId;

  const markAsSeen = () => {
    db.collection("ChatRooms")
      .doc(chatRoomId)
      .collection("Chats")
      .doc(message?.id)
      .update({
        seenBy: firebase.firestore.FieldValue.arrayUnion(currentUserId),
      });
  };

  useEffect(() => {
    if (seenBy?.includes(currentUserId) || isMe) return;

    markAsSeen(currentUserId);
  }, [seenBy]);

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      {imageContent && (
        <Pressable
          style={{ marginBottom: content ? 10 : 2 }}
          onPress={() => navigation.navigate("Image View", { imageContent })}
        >
          <Image
            source={{ uri: imageContent }}
            style={{
              width: width * 0.7,
              aspectRatio: 4 / 3,
            }}
            resizeMode="contain"
          />
        </Pressable>
      )}
      {content && <Text style={{ color: "white" }}>{content}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: isMe ? "flex-end" : "flex-start",
        }}
      >
        <Text
          style={[styles.timestamp, isMe ? styles.rightTime : styles.leftTime]}
        >
          {time}
        </Text>
        {isMe && message?.isSent && (
          <Ionicons
            name={seenBy?.length ? "checkmark-done" : "checkmark"}
            size={16}
            color="#f2f2f2"
          />
        )}
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
    backgroundColor: Color.lightYellow,
    marginLeft: 10,
    marginRight: "auto",
  },
  rightContainer: {
    backgroundColor: Color.darkYellow,
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
