import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useContext } from "react";
import { styles } from "../styles/SResults";
import { ThemeContext } from "../services/ThemeContext";

const DeleteModal = ({
  isVisible,
  setIsVisible,
  deleteSingleGame,
  deleteID,
}) => {
  const { isLight } = useContext(ThemeContext);
  const {
    centeredView,
    modalView,
    modalButtons,
    modalText,
    button,
    buttonOpen,
    buttonClose,
    textStyle,
    darkBG,
    darkBGModal,
    lightText,
  } = styles;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <View style={centeredView}>
        <View style={[modalView, !isLight && darkBGModal]}>
          <Text style={[modalText, !isLight && lightText]}>
            Ushbu oʻyinni oʻchirmoqchimisiz?
          </Text>
          <View style={modalButtons}>
            <TouchableOpacity
              onPress={() => deleteSingleGame(deleteID)}
              style={[button, buttonOpen]}
            >
              <Text style={textStyle}>Oʻchirish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={[button, buttonClose]}
            >
              <Text style={textStyle}>Bekor qilish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
