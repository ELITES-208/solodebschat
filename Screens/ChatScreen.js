import React, { useLayoutEffect } from "react";
import {
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
import MessageInput from "../components/MessageInput";

export default function ChatScreen({ navigation, route }) {
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
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>
      <MessageInput />
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
