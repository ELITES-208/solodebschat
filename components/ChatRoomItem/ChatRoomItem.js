import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../fb";

export default function ChatRoomItem({ chatRoom }) {
  const currentUser = auth.currentUser;

  const chatRoomId = chatRoom.id;

  const { id, name, imageUri } = chatRoom?.data?.users.find(
    (user) => user.id != currentUser.uid
  );

  const date = chatRoom?.data?.createdAt?.toDate().toLocaleDateString();
  const time = chatRoom?.data?.createdAt
    ?.toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const navigation = useNavigation();

  const enterChat = () => {
    navigation.navigate("Chat", { chatRoomId, name, imageUri, id });
  };

  const [info, setInfo] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("ChatRooms")
      .doc(chatRoomId)
      .collection("Chats")
      .orderBy("timeStamp", "desc")
      .limit(1)
      .onSnapshot((snapshot) =>
        setInfo(
          snapshot.docs.map((doc) => ({
            timestamp: doc.data().timeStamp,
            content: doc.data().content,
          }))
        )
      );
    return unsubscribe;
  }, []);
  // console.log(info);

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
          {info?.length != 0 ? (
            <Text style={styles.text}>
              {info?.[0]?.timestamp?.toDate().toLocaleDateString()}{" "}
              {info?.[0]?.timestamp
                ?.toDate()
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          ) : (
            <Text style={styles.text}>
              {date} {time}
            </Text>
          )}
        </View>

        {info?.length != 0 ? (
          <Text numberOfLines={1} style={styles.text}>
            {info?.[0]?.content}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
