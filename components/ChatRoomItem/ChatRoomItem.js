import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../fb";
import moment from "moment";

export default function ChatRoomItem({ chatRoom }) {
  //Fetch current user//////////////////////////
  const currentUser = auth.currentUser;
  /////////////////////////////////////////////

  //Setup Date and time for chat room item
  const chatRoomId = chatRoom.id;

  const date = chatRoom?.data?.createdAt?.toDate().toLocaleDateString();
  const time = chatRoom?.data?.createdAt
    ?.toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  ////////////////////////////////////////////////////

  //Fetch other users data////////////////////
  const [otherUser, setOtherUser] = useState(null);

  const id = chatRoom?.data?.members.find(
    (userId) => userId != currentUser.uid
  );

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => setOtherUser(doc.data()));
    return unsubscribe;
  }, []);

  const name = otherUser?.name;
  const imageUri = otherUser?.imageUri;
  /////////////////////////////////////////////

  //Navigation for chat room////////////////////////
  const navigation = useNavigation();

  const enterChat = () => {
    navigation.navigate("Chat", {
      chatRoomId,
      name,
      imageUri,
      id,
    });
  };
  /////////////////////////////////////////////////

  //Fetch timestamp for last message/////////////////////
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
            userId: doc.data().userId,
          }))
        )
      );
    return unsubscribe;
  }, []);
  // console.log(info);
  ////////////////////////////////////////////////////////////

  //Fetch and update user online status/////////////////////////
  const [lastOnlineAt, setLastOnlineAt] = useState(null);

  const updateOnlineStatus = () =>
    db
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        const diffLastOnline = moment().diff(moment(doc?.data()?.lastOnlineAt));
        if (diffLastOnline && diffLastOnline < 1 * 60 * 1000) {
          setLastOnlineAt("online");
        } else {
          setLastOnlineAt(
            `Last seen ${moment(doc?.data()?.lastOnlineAt).fromNow()}`
          );
        }
        // setLastOnlineAt(diffLastOnline);
        // setLastOnlineAt(moment(doc?.data()?.lastOnlineAt).fromNow());
      });

  useEffect(() => {
    const unsubscribe = updateOnlineStatus();
    return unsubscribe;
  }, [lastOnlineAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateOnlineStatus();
    }, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lastOnlineAt]);
  ///////////////////////////////////////////////////////////////////////////////

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
      {/* Online status indicator */}
      {lastOnlineAt === "online" ? (
        <View style={styles.onlineStatusContainer}></View>
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
            {info?.[0]?.userId === currentUser.uid
              ? `Me: ${info?.[0]?.content}`
              : info?.[0]?.content}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
