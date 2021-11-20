import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
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
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => SignOut()}
            style={{ paddingHorizontal: 5 }}
          >
            <FontAwesome5 name="arrow-circle-left" size={24} color="white" />
          </TouchableOpacity>
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
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("ChatRooms").onSnapshot((snapshot) =>
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

  const { currentUser } = useSelector((state) => state.userState);

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
});
