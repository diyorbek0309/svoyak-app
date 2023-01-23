import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  resultsWrap: {
    padding: 20,
    marginBottom: 20,
  },
  singleGame: {
    backgroundColor: "#05a21a",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  singleGamer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
  },
  gamerName: {
    color: "#fff",
    fontSize: 20,
  },
  gamerScore: {
    color: "#fff",
    fontSize: 20,
    width: "12%",
    textAlign: "center",
  },
  noResults: {
    fontSize: 20,
    textAlign: "center",
  },
});
