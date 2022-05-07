import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../fb";
import firebase from "firebase/compat/app";

export default function ResetPasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //function for re-authentication //////////////////////
  const reauthenticate = (currentPassword) => {
    var user = auth?.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  /////////////////////////////////////////////////////

  //Function to change password/////////////////////////////////
  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword)
      .then(() => {
        var user = auth?.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password updated!");
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  //////////////////////////////////////////////////////////////

  //Confirm if new password matches confirm password///////////////////////////
  const onResetPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      changePassword(currentPassword, newPassword);
    }
    if (newPassword && newPassword != confirmPassword) {
      alert("Passwords do not match");
    }
    if (!currentPassword) {
      alert("Enter your current password");
    }
    if (currentPassword && !newPassword) {
      alert("Enter a new password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.textbig}>Reset Your Password?</Text>
          <Text style={styles.textSmall}>
            Please enter your old password then type the new password to reset
          </Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              onChangeText={(text) => setCurrentPassword(text)}
              value={currentPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.Button}
        onPress={() => onResetPassword()}
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
    margin: 10,
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
