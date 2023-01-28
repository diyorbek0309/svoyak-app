import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { icons } from "../types/enums";

const FinishedSvoyak = () => {
  const newResults: { name: string; score: number }[] = [];
  const [gamers, setGamers] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getPreGames().then((data) => {
      prepareData(data[data.length - 1]);
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

  const prepareData = (results) => {
    setTitle(results.title);

    results &&
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

    let currentRank = 1;
    let currentScore = newResults[0].score;

    for (let i = 0; i < newResults.length; i++) {
      let gamer = newResults[i];
      if (gamer.score != currentScore) {
        currentRank = i + 1;
        currentScore = gamer.score;
      }

      setGamers([
        ...gamers,
        {
          icon: getEmoji(currentRank),
          name: gamer.name,
          score: gamer.score,
        },
      ]);
    }
  };

  const getEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return icons[0];
      case 2:
        return icons[1];
      case 3:
        return icons[2];
      default:
        return `${rank}.`;
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={styles.titleInput}>{title ? title : ""} natijalari</Text>
      {gamers && gamers.length ? (
        gamers.map((gamer: any, index) => (
          <View key={index} style={styles.resultWrap}>
            <Text style={styles.resultText}>{gamer.icon}</Text>
            <Text style={styles.resultText}>{gamer.name}:</Text>
            <Text style={styles.resultText}>{gamer.score} ball</Text>
          </View>
        ))
      ) : (
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
            Qandaydir xatolik yuzaga keldi!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FinishedSvoyak;
