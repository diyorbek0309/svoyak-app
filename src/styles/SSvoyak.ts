import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  darkBG: {
    backgroundColor: "#12355b",
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
    position: "relative",
  },
  scores: {
    fontSize: 20,
    paddingVertical: 5,
  },
  hintsWrap: {
    position: "absolute",
    top: "40%",
    left: "7%",
    zIndex: 3,
  },
  hintButton: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: "#008086",
    borderWidth: 1,
    borderColor: "#fff",
  },
  hintText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
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
    backgroundColor: "#008086",
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
    backgroundColor: "#008086",
    marginLeft: 5,
  },
  minusButton: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  minusText: {
    fontSize: 24,
  },
  scoreButtonText: {
    fontSize: 20,
    color: "#fff",
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
  goHome: {
    width: 140,
    marginTop: 40,
    marginLeft: "30%",
  },
});
