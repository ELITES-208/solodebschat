import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ChatRoomItem({ chatRoom }) {
  const { name, imageUri } = chatRoom?.data?.users[0];

  const navigation = useNavigation();

  // const onPress = () => {
  //   navigation.navigate("ChatRoom", { id: chatRoom.id });
  // };

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
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
