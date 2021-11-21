import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import ChatRoomItem from "../components/ChatRoomItem";
import ChatRoomsData from "../assets/dummy-data/ChatRooms";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../fb";

export default function MainScreen({ navigation }) {
  const [chatRoomsFetched, setChatRoomsFetched] = useState([]);

  const dispatch = useDispatch();

  const { fetchUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const unsubscribe = fetchUser();
    return unsubscribe;
  }, []);

  const { currentUser } = useSelector((state) => state.userState);

  const SignOut = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => auth.signOut() },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "SoloChat",
      headerTitleAlign: "center",
      headerLeft: () => (
        <View style={styles.headContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Image
              source={{
                uri: auth.currentUser.photoURL,
              }}
              style={styles.headImage}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
            style={{ paddingHorizontal: 5 }}
          >
            <MaterialCommunityIcons
              name="pencil-plus"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => SignOut()}
            style={{ paddingHorizontal: 5 }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, auth.currentUser.photoURL]);

  useEffect(() => {
    const unsubscribe = db
      .collection("ChatRooms")
      .where("members", "array-contains", `${auth.currentUser.uid}`)
      .onSnapshot((snapshot) =>
        setChatRoomsFetched(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  // console.log(chatRoomsFetched);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={chatRoomsFetched}
          renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headContainer: {
    padding: 10,
  },
  headImage: {
    height: 40,
    width: 40,
    borderRadius: 30,
    marginRight: 10,
  },
});
