import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function ImageViewScreen({ route, navigation }) {
  const { width } = useWindowDimensions;

  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      title: null,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "black",
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerTintColor: "#fff",
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: route?.params?.imageContent }}
          style={{
            width: width,
            aspectRatio: 4 / 3,
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    marginTop: 50,
    marginLeft: 20,
  },
});
