import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FinishedSvoyak from "../components/FinishedSvoyak";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { eSvoyak, scores, defaultData } from "../types/enums";

const Svoyak = () => {
  const [title, setTitle] = useState("Oʻyin nomi");
  const [canAdd, setCanAdd] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [data, setData] = useState<ISvoyakData[]>(defaultData);

  const onChangeName = (name: string, id: number) => {
    const newData: ISvoyakData[] = [...data];
    newData.find((item) => item.id === id).name = name;
    setData(newData);
  };

  const onChangeScore = (scores: string, id: number) => {
    const pattern = /^[\-\+\s]*[\d\s]*[\-\+\s]*$/;
    if (pattern.test(scores[scores.length - 1])) {
      const newData: ISvoyakData[] = [...data];
      const preScoresLength = newData.find((item) => item.id === id).scores
        .length;
      newData.find((item) => item.id === id).scores =
        preScoresLength < scores.length && scores[scores.length - 1] === "0"
          ? scores + " + "
          : scores;
      setData(newData);
    }
  };

  const onScoreButtonClicked = (gamerID: number, score: number) => {
    const newData: ISvoyakData[] = [...data];
    newData.find((item) => item.id === gamerID).scores += score + " + ";
    setData(newData);
  };

  const onGameFinished = async () => {
    setIsFinished(true);
    try {
      const games = await getPreGames();
      await addNewGame(games);
    } catch (error) {
      console.log(error);
    }
  };

  const onGamerAdded = () => {
    if (data.length < 15) {
      const newGamer: ISvoyakData = {
        id: data.length,
        name: `${data.length + 1}-${eSvoyak.DEFAULT_NAME}`,
        scores: "",
        numberOfLines: 2,
        isActive: false,
      };
      setData([...data, newGamer]);
    }
    if (data.length === 15) setCanAdd(true);
  };

  const showScoreButtons = (id: number) => {
    const newData: ISvoyakData[] = [...data];
    newData.forEach((item) => (item.isActive = false));
    newData.find((item) => item.id === id).isActive = true;

    setData(newData);
  };

  const getPreGames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("games");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error);
    }
  };

  const addNewGame = async (games) => {
    const game = {
      id: games.length,
      title,
      date: Date.now(),
      results: data,
      isFinished: true,
    };
    games.push(game);
    await AsyncStorage.setItem("games", JSON.stringify(games));
  };

  const clearData = () => {
    setData(defaultData);
    console.log("done");
  };

  return (
    <ScrollView>
      {isFinished ? (
        <FinishedSvoyak />
      ) : (
        <>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            maxLength={24}
          />
          {data &&
            data.length &&
            data.map((gamer) => (
              <View key={gamer.id} style={styles.scoresWrap}>
                <TextInput
                  style={styles.participantInput}
                  value={gamer.name}
                  onChangeText={(name) => onChangeName(name, gamer.id)}
                  maxLength={18}
                />
                <View style={styles.scoreButtonsWrap}>
                  {gamer.isActive ? (
                    scores.map((score) => (
                      <TouchableOpacity
                        onPress={() => onScoreButtonClicked(gamer.id, score)}
                        style={styles.scoreButton}
                        key={score}
                      >
                        <Text style={styles.scoreButtonText}>{score}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.sumScores}>
                      {!gamer.isActive &&
                        gamer.scores
                          .split(" + ")
                          .map((score) => Number(score))
                          .reduce((acc: number, a: number) => +acc + a, 0)}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.scores}
                  multiline={true}
                  value={gamer.scores}
                  onChangeText={(scores) => onChangeScore(scores, gamer.id)}
                  onFocus={() => showScoreButtons(gamer.id)}
                />
              </View>
            ))}
          <View style={styles.extraButtons}>
            <TouchableOpacity
              onPress={onGamerAdded}
              disabled={canAdd}
              style={styles.addGamer}
            >
              <Text style={styles.textInButton}>Qoʻshish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGameFinished} style={styles.endGame}>
              <Text style={styles.textInButton}>Yakunlash</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Svoyak;
