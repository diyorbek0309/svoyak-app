import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/SSvoyak";

const FinishedSvoyak = ({ results, title }) => {
  const icons = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  const newResults = [];
  results.forEach((result) => {
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
