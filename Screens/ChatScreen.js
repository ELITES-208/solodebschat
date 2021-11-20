import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MessageBox from "../components/MessageBox";
import MessageInput from "../components/MessageInput";
import { db } from "../fb";

export default function ChatScreen({ navigation, route }) {
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
          <Text style={styles.headName}>{route.params?.name}</Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
