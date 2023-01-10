import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  App: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 50,
    height: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0f0",
    marginBottom: 20,
    borderRadius: 6,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  author: {
    textAlign: "right",
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#00f",
  },
  created: {
    textAlign: "right",
    color: "#00f",
  },
});
