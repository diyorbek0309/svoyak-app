import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  darkBG: {
    backgroundColor: "#12355b",
  },
  darkBGModal: {
    backgroundColor: "#012654",
  },
  lightText: {
    color: "#fff",
  },
  resultsWrap: {
    padding: 20,
    backgroundColor: "#aaffff",
  },
  singleGame: {
    backgroundColor: "#008086",
    padding: 15,
    marginBottom: 30,
    borderRadius: 10,
  },
  singleGamer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  delIcon: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  gameTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
    paddingBottom: 5,
  },
  gamerName: {
    color: "#fff",
    fontSize: 20,
    fontStyle: "italic",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#f00",
    marginRight: 15,
  },
  buttonClose: {
    backgroundColor: "#008086",
    marginLeft: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameDate: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 10,
    fontSize: 22,
  },
});
