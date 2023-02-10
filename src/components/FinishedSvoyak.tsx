import { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { getEmoji } from "../services/getEmoji";
import { ThemeContext } from "../services/ThemeContext";

const FinishedSvoyak = ({ results, title, navigation }) => {
  const newResults: { name: string; score: number }[] = [];
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

  results.forEach((result: ISvoyakData) => {
    newResults.push({
      name: result.name,
      score: result.scores
        .split(" + ")
        .map((item: string) => {
          if (item) return parseInt(item);
          else return 0;
        })
        .reduce((acc: number, a: number) => acc + a, 0),
    });
  });

  newResults.sort((a, b) => b.score - a.score);

  let gamers = [];
  let currentRank = 1;
  let currentScore = newResults[0].score;
  for (let i = 0; i < newResults.length; i++) {
    let gamer = newResults[i];
    if (gamer.score != currentScore) {
      currentRank = i + 1;
      currentScore = gamer.score;
    }
    gamers.push({
      icon: getEmoji(currentRank),
      name: gamer.name,
      score: gamer.score,
    });
  }

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={[titleInput, !isLight && lightText]}>
        {title} natijalari
      </Text>
      {gamers &&
        gamers.length &&
        gamers.map((gamer: any, index) => (
          <View key={index} style={resultWrap}>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.icon}
            </Text>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.name}:
            </Text>
            <Text style={[resultText, !isLight && lightText]}>
              {gamer.score} ball
            </Text>
          </View>
        ))}
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
