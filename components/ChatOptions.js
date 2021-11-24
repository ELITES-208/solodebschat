import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, db } from "../fb";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useNavigation } from "@react-navigation/native";

export default function ChatOptions({ chatRoomData }) {
  const dispatch = useDispatch();

  const { setChatOptionVisible } = bindActionCreators(actionCreators, dispatch);

  const { isVisible } = useSelector((state) => state?.chatState);

  const currentUser = auth.currentUser;

  const navigation = useNavigation();

  const deleteChatRoom = async () => {
    await db
      .collection("AddedTo")
      .doc(currentUser.uid)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(chatRoomData?.id),
      })
      .catch((error) => alert(error));

    await db
      .collection("AddedTo")
      .doc(chatRoomData?.id)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
      })
      .catch((error) => alert(error));

    await db
      .collection("ChatRooms")
      .doc(chatRoomData?.chatRoomId)
      .delete()
      .then(() => navigation.navigate("Main"))
      .catch((error) => alert(error));

    setChatOptionVisible(false);
  };

  const confirmDelete = () => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteChatRoom() },
    ]);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={() => setChatOptionVisible(false)}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#000000aa",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setChatOptionVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 50,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <Pressable
            onPress={() => {
              Platform.OS != "web" ? confirmDelete(false) : deleteChatRoom();
            }}
          >
            <Text style={styles.optionItem}>Delete Chat</Text>
          </Pressable>
          <Pressable onPress={() => setChatOptionVisible(false)}>
            <Text style={styles.optionItem}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionItem: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 20,
    textAlign: "center",
  },
});
