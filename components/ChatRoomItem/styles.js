import { StyleSheet } from "react-native";
import Color from "../../assets/Color";

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
    left: 50,
    top: 10,
  },
  badgeText: {
    color: "white",
  },
  onlineStatusContainer: {
    backgroundColor: Color.green,
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    left: 45,
    top: 10,
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
