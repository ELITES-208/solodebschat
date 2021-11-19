import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: "green",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 45,
    top: 10,
  },
  badgeText: {
    color: "white",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  text: {
    color: "grey",
  },
});

export default styles;
