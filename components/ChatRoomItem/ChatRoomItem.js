import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ChatRoomItem({ chatRoom }) {
  const user = chatRoom.users[1];

  const navigation = useNavigation();

  // const onPress = () => {
  //   navigation.navigate("ChatRoom", { id: chatRoom.id });
  // };

  return (
    <TouchableOpacity style={styles.container}>
      {/* Image of person/chat item */}
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      {/* number badges/unread count */}
      {chatRoom.newMessages ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      ) : null}

      {/* part containing name, time and last message */}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
        </View>

        <Text numberOfLines={1} style={styles.text}>
          {chatRoom.lastMessage.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
