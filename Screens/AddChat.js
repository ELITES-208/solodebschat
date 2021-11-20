import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddChatItem from "../components/AddChatItem";
import UsersData from "../assets/dummy-data/Users";
import { db } from "../fb";

export default function AddChat({ navigation }) {
  const [usersFetched, setUsersFetched] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) =>
      setUsersFetched(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  console.log(usersFetched);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
      headerBackTitle: null,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={usersFetched}
          renderItem={({ item }) => <AddChatItem user={item} />}
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
