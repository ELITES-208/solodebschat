import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../fb";
import firebase from "firebase/compat/app";

export default function AddChatItem({ user }) {
  const currentUser = auth.currentUser;

  const {
    id,
    data: { name, imageUri },
  } = user;
  // console.log(currentUser);

  const navigation = useNavigation();

  const createChatRoom = async () => {
    await db
      .collection("AddedTo")
      .doc(currentUser.uid)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(id),
      })
      .catch((error) => alert(error));

    await db
      .collection("AddedTo")
      .doc(id)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      })
      .catch((error) => alert(error));

    await db
      .collection("ChatRooms")
      .add({
        members: [currentUser.uid, id],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => navigation.goBack())
      .catch((error) => alert(error));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => createChatRoom()}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
