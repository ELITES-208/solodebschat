import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MessageInput() {
  const [message, setMessage] = useState();

  const sendMessage = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name="emotsmile"
          size={24}
          color="grey"
          style={styles.icon}
        />
        <TextInput
          placeholder={"Type your message..."}
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.textInput}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    width: "100%",
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
