import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  darkBG: {
    backgroundColor: "#222",
  },
  lightText: {
    color: "#fff",
  },
  titleInput: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 15,
  },
  participantInput: {
    fontSize: 22,
    width: "45%",
  },
  scoresWrap: {
    marginTop: 15,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
  },
  scores: {
    fontSize: 20,
    paddingVertical: 5,
  },
  extraButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
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
  scoreButtonsWrap: {
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    right: 20,
  },
  scoreButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: "#0f0",
    marginLeft: 5,
  },
  scoreButtonText: {
    fontSize: 20,
  },
  activeGamer: {
    display: "flex",
  },
  sumScores: {
    fontSize: 20,
    fontStyle: "italic",
  },
  // -------------------------------------------------------------
  resultWrap: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    marginRight: 10,
  },
});
