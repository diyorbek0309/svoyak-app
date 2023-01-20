import { View, Text, ScrollView } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { icons } from "../types/enums";

const FinishedSvoyak = ({ results, title }) => {
  useEffect(() => {
    getPreGames()
      .then((games) => {
        addNewGame(games);
      })
      .catch((error) => console.log(error));
  }, []);

  const newResults: { name: string; score: number }[] = [];
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

  const getPreGames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("games");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewGame = async (games) => {
    const game = {
      id: games.length,
      title,
      date: Date.now(),
      results: newResults,
      isFinished: true,
    };
    games.push(game);
    await AsyncStorage.setItem("games", JSON.stringify(games));
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={styles.titleInput}>{title} natijalari</Text>
      {newResults &&
        newResults.length &&
        newResults.map((result: any, index) => (
          <View key={index} style={styles.resultWrap}>
            <Text style={styles.resultText}>
              {icons[index] || `${index + 1}.`}
            </Text>
            <Text style={styles.resultText}>{result.name}:</Text>
            <Text style={styles.resultText}>{result.score}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default FinishedSvoyak;
