import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/SResults";
import { icons } from "../types/enums";

const Results = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getPreGames().then((games) => {
      sortGames(games);
    });
  }, []);

  const getPreGames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("games");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error);
    }
  };

  const sortGames = (games) => {
    games.map((game) => {
      game.results.map((result) => {
        result.scores = result.scores
          .split(" + ")
          .map((item: string) => {
            if (item) return parseInt(item);
            else return 0;
          })
          .reduce((acc: number, a: number) => acc + a, 0);
      });
      game.results.sort((a, b) => b.scores - a.scores);
    });
    setGames(games);
  };

  return (
    <View style={styles.resultsWrap}>
      {games && games.length ? (
        games.map((game) => (
          <View key={game.id} style={styles.singleGame}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            {game.results.length &&
              game.results.map((result, index) => (
                <View key={index} style={styles.singleGamer}>
                  <Text style={styles.gamerName}>
                    {icons[index] || `${index + 1}.`}
                  </Text>
                  <Text style={styles.gamerName}>{result.name}</Text>
                  <Text style={styles.gamerScore}>{result.scores}</Text>
                </View>
              ))}
          </View>
        ))
      ) : (
        <Text>Yakunlangan oʻyinlar yoʻq!</Text>
      )}
    </View>
  );
};

export default Results;
