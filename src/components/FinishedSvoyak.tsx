import { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/SSvoyak";
import { ThemeContext } from "../services/ThemeContext";

const FinishedSvoyak = ({ gamers, title, navigation }) => {
  const { isLight } = useContext(ThemeContext);
  const {
    titleInput,
    resultText,
    resultWrap,
    lightText,
    addGamer,
    textInButton,
    goHome,
  } = styles;

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={[titleInput, !isLight && lightText]}>
        {title} natijalari
      </Text>
      {gamers && gamers.length ? (
        gamers.map((gamer: any, index) => (
          <View key={index} style={resultWrap}>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.icon}
            </Text>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.name}:
            </Text>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.score === 0 && gamer.isLife
                ? "0 ball (Jonli)"
                : gamer.score + " ball"}
            </Text>
          </View>
        ))
      ) : (
        <Text>Ishtirokchilar yo'q</Text>
      )}
      <TouchableOpacity
        style={[addGamer, goHome]}
        onPress={() => navigation.navigate("Svoyak Calculator")}
      >
        <Text style={textInButton}>Bosh sahifa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FinishedSvoyak;
