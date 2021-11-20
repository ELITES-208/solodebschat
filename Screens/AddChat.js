import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddChatItem from "../components/AddChatItem";
import UsersData from "../assets/dummy-data/Users";
import { auth, db } from "../fb";

export default function AddChat({ navigation }) {
  const currentUserId = auth.currentUser.uid;

  const [fetchedAddedTo, setFetchedAddedTo] = useState([]);

  const [usersFetched, setUsersFetched] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("AddedTo")
      .doc(currentUserId)
      .onSnapshot((doc) => {
        setFetchedAddedTo(doc.data()?.users);
      });
    return unsubscribe;
  }, []);
  // console.log(fetchedAddedTo);

  useEffect(() => {
    if (fetchedAddedTo.length != 0) {
      const unsubscribe = db
        .collection("users")
        .where("userId", "not-in", fetchedAddedTo)
        .onSnapshot((snapshot) =>
          setUsersFetched(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      return unsubscribe;
    } else null;
  }, [fetchedAddedTo]);

  // console.log(usersFetched);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
      headerBackTitle: null,
    });
  }, [navigation]);
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
