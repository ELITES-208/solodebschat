import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { auth, db, storage } from "../fb";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  //Deconstruct user data////////////////////////////
  const [displayName, setDisplayName] = useState(
    auth?.currentUser?.displayName
  );
  const [currentUserImage, setCurrentUserImage] = useState(
    auth?.currentUser?.photoURL
  );
  //   console.log(currentUserImage);
  //////////////////////////////////////////////////

  //fetch username from firebase////////////////////////
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .onSnapshot((doc) => setDisplayName(doc?.data()?.name));
    return unsubscribe;
  }, []);
  ///////////////////////////////////////////////////

  //Settings for header upon navigation/////////////////////////
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      title: "Profile",
      headerBackTitle: null,
      headerTitleAlign: "center",
    });
    return unsubscribe;
  }, [navigation]);
  ///////////////////////////////////////////////////////////

  //Get window width////////////////////////////////////
  const { width } = useWindowDimensions();
  ////////////////////////////////////////////////////

  //Get camera and library permissions////////////////////////////////
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
  //////////////////////////////////////////////////////////////////

  //Image and Progress bar state/////////////////
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(null);
  /////////////////////////////////////

  //function to reset image and progress bar state//////////
  const resetFields = () => {
    setImage(null);
    setProgress(0);
  };
  ///////////////////////////////////////////////////////////

  //Function to pick image////////////////////////
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };
  //   console.log(image);
  /////////////////////////////////////////////////

  //Upload image function///////////////////////
  const uploadImage = async () => {
    const uri = image;
    const childPath = `users/${auth.currentUser.uid}/`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(`${snapshot.bytesTransferred}`);
      setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        updateUserImage(snapshot);
        // console.log(snapshot);
      });
    };

    const taskError = (err) => {
      console.log(err);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  /////////////////////////////////////////////////////////////////

  //Function to update user image//////////////////////////////
  const updateUserImage = (imageURL) => {
    auth.currentUser
      .updateProfile({
        photoURL: imageURL,
      })
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            imageUri: imageURL,
          })
          .catch((error) => alert(error));
        setCurrentUserImage(auth?.currentUser?.photoURL);
      })
      .catch((error) => alert(error));

    resetFields();
  };
  /////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: currentUserImage,
            }}
            style={[
              styles.image,
              { width: width * 0.5, height: width * 0.5, borderRadius: width },
            ]}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.cameraButton,
              { top: width * 0.4, right: width * 0.3 },
            ]}
            onPress={() => pickImage()}
          >
            <Feather
              name="camera"
              size={24}
              color="white"
              style={{ padding: width * 0.025 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text>Name</Text>
            <Text style={styles.name}>{displayName}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Edit Name")}
          >
            <Feather name="edit-3" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {image && (
        <View>
          <View style={styles.sendImageContainer}>
            <Image
              source={{ uri: image }}
              style={{ aspectRatio: 1 / 1, height: 100, borderRadius: 200 }}
              resizeMode="contain"
            />
            <Pressable onPress={() => setImage(null)}>
              <AntDesign
                name="close"
                size={26}
                color="grey"
                style={{ margin: 2 }}
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
      {image ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Button}
          onPress={uploadImage}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Button}
          onPress={() => navigation.navigate("Reset Password")}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  image: {},
  nameContainer: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cameraButton: {
    backgroundColor: "green",
    borderRadius: 100,
    position: "absolute",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
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
