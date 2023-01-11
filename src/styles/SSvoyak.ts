import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleInput: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 15,
  },
  participantInput: {
    fontSize: 22,
  },
  scoresWrap: {
    marginTop: 15,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
  },
  scores: {
    fontSize: 20,
  },
  extraButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  addGamer: {
    paddingVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 20,
    backgroundColor: "#0f0",
  },
  endGame: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#f00",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
  },
});
