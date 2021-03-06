import { SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ChatOptions from "../components/ChatOptions";
import MessageBox from "../components/MessageBox";
import MessageInput from "../components/MessageInput";
import { db } from "../fb";
import { actionCreators } from "../redux";

export default function ChatScreen({ navigation, route }) {
  //State for modal visibility//////////////////////////
  const dispatch = useDispatch();

  const { setChatOptionVisible } = bindActionCreators(actionCreators, dispatch);
  ///////////////////////////////////////////////////////

  //Fetch messages on navigation//////////////////////////////////////////
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("ChatRooms")
      .doc(route?.params?.chatRoomId)
      .collection("Chats")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            isSent: !doc.metadata.hasPendingWrites,
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  ///////////////////////////////////////////////

  //fetch and update last online at///////////////////////////////////
  const [lastOnlineAt, setLastOnlineAt] = useState(null);
  const updateOnlineStatus = () =>
    db
      .collection("users")
      .doc(route?.params?.id)
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
    }, 40 * 1000);
    return () => clearInterval(interval);
  }, [lastOnlineAt]);
  // console.log(lastOnlineAt);
  ////////////////////////////////////////////////////////////////////

  //Header settings upon navigation and update of last online at////////////////////////////////////
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      title: "Chat",
      headerBackTitle: null,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.headContainer}>
          <Image
            source={{
              uri: route?.params?.imageUri,
            }}
            style={styles.headImage}
          />
          <View>
            <Text style={styles.headName}>{route?.params?.name}</Text>
            <Text style={{ color: "white" }} numberOfLines={1}>
              {lastOnlineAt}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 5 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setChatOptionVisible(true)}
            style={{ paddingHorizontal: 5 }}
          >
            <SimpleLineIcons name="options-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
    return unsubscribe;
  }, [navigation, lastOnlineAt]);
  /////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container}>
      <ChatOptions chatRoomData={route?.params} />
      {/* <TouchableWithoutFeedback
        onPress={() => {
          Platform.OS != "web" ? Keyboard.dismiss() : null;
        }}
      > */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageBox message={item} chatRoomId={route?.params?.chatRoomId} />
          )}
          showsVerticalScrollIndicator={false}
          inverted
          maxToRenderPerBatch={6}
        />
      </View>
      {/* </TouchableWithoutFeedback> */}
      <MessageInput route={route} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  headImage: {
    height: 40,
    width: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  headName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
