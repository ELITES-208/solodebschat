import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import EmojiPicker from "rn-emoji-keyboard";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db, storage } from "../fb";
import firebase from "firebase/compat/app";
import * as ImagePicker from "expo-image-picker";

export default function MessageInput({ route }) {
  //image Picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const [IsEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const resetFields = () => {
    setInput("");
    setIsEmojiPickerOpen(false);
    setImage(null);
    setProgress(0);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };

  const uploadImage = async () => {
    const uri = image;
    const childPath = `ChatRooms/${
      route?.params?.chatRoomId
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(`${snapshot.bytesTransferred}`);
      setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        sendMessage(snapshot);
        // console.log(snapshot);
      });
    };

    const taskError = (err) => {
      console.log(err);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const sendMessage = (imageURL) => {
    Keyboard.dismiss();

    db.collection("ChatRooms")
      .doc(route?.params?.chatRoomId)
      .collection("Chats")
      .add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: input || null,
        imageContent: imageURL || null,
        userDisplayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        userImageUri: auth.currentUser.photoURL,
        seenBy: [],
      });

    resetFields();
  };

  const onSend = () => {
    if (image) {
      uploadImage();
    } else if (input) {
      sendMessage();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      {image && (
        <View>
          <View style={styles.sendImageContainer}>
            <Image
              source={{ uri: image }}
              style={{ aspectRatio: 4 / 3, height: 100, borderRadius: 5 }}
              resizeMode="contain"
            />
            <Pressable onPress={() => setImage(null)}>
              <AntDesign
                name="close"
                size={26}
                color="grey"
                style={[styles.icon, { margin: 2 }]}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginHorizontal: 15,
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                height: 3,
                width: `${progress * 100}%`,
                backgroundColor: "#d9a754",
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      )}
      <View
        style={[
          styles.container,
          {
            marginBottom: IsEmojiPickerOpen
              ? Dimensions.get("window").height * 0.4
              : "auto",
          },
        ]}
      >
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
            onSubmitEditing={onSend}
          />
          <Pressable onPress={takePhoto}>
            <Feather name="camera" size={24} color="grey" style={styles.icon} />
          </Pressable>

          <Pressable onPress={pickImage}>
            <Feather name="image" size={24} color="grey" style={styles.icon} />
          </Pressable>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={onSend}
        >
          <Ionicons
            name="send-sharp"
            size={25}
            color="white"
            style={{ position: "relative", left: 3, padding: 10 }}
          />
        </TouchableOpacity>

        <View>
          <EmojiPicker
            onEmojiSelected={(emoji) =>
              setInput((currentMessage) => currentMessage + emoji.emoji)
            }
            open={IsEmojiPickerOpen}
            onClose={() => setIsEmojiPickerOpen(false)}
            backdropColor=""
            expandable={false}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  sendImageContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    // width: "100%",
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
    marginHorizontal: 4,
  },
  textInput: { flex: 1, padding: 5, marginHorizontal: 5 },
  buttonContainer: {
    backgroundColor: "green",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
