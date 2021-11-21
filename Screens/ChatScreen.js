import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const dispatch = useDispatch();

  const { setChatOptionVisible } = bindActionCreators(actionCreators, dispatch);

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
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
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
          <Text style={styles.headName}>{route?.params?.name}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
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
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ChatOptions chatRoomData={route?.params} />
      <TouchableWithoutFeedback
        onPress={() => {
          Platform.OS != "web" ? Keyboard.dismiss() : null;
        }}
      >
        <View style={{ flex: 1, paddingTop: 10 }}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageBox message={item} />}
            showsVerticalScrollIndicator={false}
            inverted
          />
        </View>
      </TouchableWithoutFeedback>
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
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
