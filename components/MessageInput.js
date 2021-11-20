import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../fb";
import firebase from "firebase/compat/app";

export default function MessageInput({ route }) {
  const [input, setInput] = useState("");
  const [IsEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("ChatRooms")
      .doc(route?.params?.chatRoomId)
      .collection("Chats")
      .add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: input,
        userDisplayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        userImageUri: auth.currentUser.photoURL,
      });

    setInput("");
    setIsEmojiPickerOpen(false);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { height: IsEmojiPickerOpen || Platform.OS === "web" ? "50%" : "auto" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiPickerOpen((currentValue) => !currentValue);
              Keyboard.dismiss();
            }}
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="grey"
              style={styles.icon}
            />
          </Pressable>
          <TextInput
            placeholder={"Type your message..."}
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.textInput}
            onSubmitEditing={sendMessage}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={sendMessage}
        >
          <Ionicons
            name="send-sharp"
            size={25}
            color="white"
            style={{ position: "relative", left: 3, padding: 10 }}
          />
        </TouchableOpacity>
      </View>
      {Platform.OS != "web"
        ? IsEmojiPickerOpen && (
            <EmojiSelector
              onEmojiSelected={(emoji) =>
                setInput((currentMessage) => currentMessage + emoji)
              }
              columns={8}
            />
          )
        : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    padding: 5,
  },
  icon: {
    marginHorizontal: 2,
  },
  textInput: { flex: 1, padding: 5, marginHorizontal: 5 },
  buttonContainer: {
    backgroundColor: "green",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
