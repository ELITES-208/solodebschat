import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import ChatRoomItem from "../components/ChatRoomItem";
import ChatRoomsData from "../assets/dummy-data/ChatRooms";

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();

  const { fetchUser } = bindActionCreators(actionCreators, dispatch);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "SoloChat",
      headerRight: () => <View></View>,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = fetchUser();
    return unsubscribe;
  }, []);

  const { currentUser } = useSelector((state) => state.userState);

  return (
    <SafeAreaView style={styles.container}>
      <ChatRoomItem chatRoom={ChatRoomsData[0]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
