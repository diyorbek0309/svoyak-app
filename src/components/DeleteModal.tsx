import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../styles/SResults";

const DeleteModal = ({
  isVisible,
  setIsVisible,
  deleteSingleGame,
  deleteID,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {
      setIsVisible(!isVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Ushbu o'yinni o'chirmoqchimisiz?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            onPress={() => deleteSingleGame(deleteID)}
            style={[styles.button, styles.buttonOpen]}
          >
            <Text style={styles.textStyle}>O'chirish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={styles.textStyle}>Bekor qilish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default DeleteModal;
