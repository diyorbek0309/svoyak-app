import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { icons } from "../types/enums";

const FinishedSvoyak = ({ results, title, clearData }) => {
  const newResults: { name: string; score: number }[] = [];
  useEffect(() => {
    clearData();
  }, []);
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
