import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";

export default function App() {
  const dispatch = useDispatch();

  const { fetchUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const unsubscribe = fetchUser();
    return unsubscribe;
  }, []);

  const { currentUser } = useSelector((state) => state.userState);

  return (
    <View style={styles.container}>
      <Text>Chat screen of {currentUser?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
