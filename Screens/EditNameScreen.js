import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../fb";

export default function EditNameScreen({ navigation }) {
  const [newName, setNewName] = useState("");

  //Function to update user name//////////////////////////////
  const updateUserName = (newName) => {
    auth.currentUser
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            name: newName,
          })
          .catch((error) => alert(error));
        alert("Username updated");
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  /////////////////////////////////////////////////////////

  //
  const onEditUsername = () => {
    if (newName) {
      updateUserName(newName);
    } else {
      alert("Enter a valid user name");
    }
  };
  //

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.textbig}>Edit Your User Name?</Text>
          <Text style={styles.textSmall}>Please enter your new user name</Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              onChangeText={(text) => setNewName(text)}
              value={newName}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.Button}
        onPress={() => onEditUsername()}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textbig: {
    fontSize: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d9a754",
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  Button: {
    backgroundColor: "#d9a754",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 10,
  },
});
