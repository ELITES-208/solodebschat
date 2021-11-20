import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../fb";

export default function AddChatItem({ user }) {
  const {
    id,
    data: { name },
  } = user;
  console.log(id);

  const navigation = useNavigation();

  const createChatRoom = async () => {
    await db
      .collection("ChatRooms")
      .add({
        users: [{ id: user?.id, name: user?.name, imageUri: user?.imageUri }],
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
      <Image source={{ uri: user?.imageUri }} style={styles.image} />
      <Text style={styles.name}>{user?.name}</Text>
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
