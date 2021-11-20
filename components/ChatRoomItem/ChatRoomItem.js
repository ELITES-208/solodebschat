import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../fb";

export default function ChatRoomItem({ chatRoom }) {
  const currentUser = auth.currentUser;

  const chatRoomId = chatRoom.id;

  const { name, imageUri } = chatRoom?.data.users.find(
    (user) => user.id != currentUser.uid
  );

  const navigation = useNavigation();

  const enterChat = () => {
    navigation.navigate("Chat", { chatRoomId, name, imageUri });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={enterChat}
    >
      {/* Image of person/chat item */}
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />

      {/* number badges/unread count */}
      {chatRoom.newMessages ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>4</Text>
        </View>
      ) : null}

      {/* part containing name, time and last message */}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>createdAt</Text>
        </View>

        <Text numberOfLines={1} style={styles.text}>
          This is the last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
