import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FinishedSvoyak from "../components/FinishedSvoyak";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { eSvoyak, scoresList } from "../types/enums";
import { ThemeContext } from "../services/ThemeContext";

const Svoyak = ({ navigation }) => {
  const [title, setTitle] = useState("Oʻyin nomi");
  const [canAdd, setCanAdd] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { isLight } = useContext(ThemeContext);
  const {
    darkBG,
    lightText,
    titleInput,
    participantInput,
    scoreButton,
    scoreButtonText,
    scores,
    scoreButtonsWrap,
    sumScores,
    scoresWrap,
    extraButtons,
    textInButton,
    endGame,
    addGamer,
  } = styles;
  const defaultData = [
    {
      id: 0,
      name: `1-${eSvoyak.DEFAULT_NAME}`,
      scores: "",
      numberOfLines: 2,
      isActive: false,
    },
    {
      id: 1,
      name: `2-${eSvoyak.DEFAULT_NAME}`,
      scores: "",
      numberOfLines: 2,
      isActive: false,
    },
    {
      id: 2,
      name: `3-${eSvoyak.DEFAULT_NAME}`,
      scores: "",
      numberOfLines: 2,
      isActive: false,
    },
    {
      id: 3,
      name: `4-${eSvoyak.DEFAULT_NAME}`,
      scores: "",
      numberOfLines: 2,
      isActive: false,
    },
    {
      id: 4,
      name: `5-${eSvoyak.DEFAULT_NAME}`,
      scores: "",
      numberOfLines: 2,
      isActive: false,
    },
  ];
  const [data, setData] = useState<ISvoyakData[]>([]);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     // if (isFinished) {
  //     //   return;
  //     // }
  //     console.log("12345");

  //     e.preventDefault();
  //     Alert.alert(
  //       "Davom ettirilsinmi?",
  //       "Oʻyinni yakunlamasangiz, qilingan oʻzgarishlar saqlanmaydi!",
  //       [
  //         { text: "Davom etish", style: "cancel", onPress: () => {} },
  //         {
  //           text: "Tark etish",
  //           style: "destructive",
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   });
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setIsFinished(false);
      setData(defaultData);
      const onBackPress = (e) => {
        Alert.alert(
          "Davom ettirilsinmi?",
          "Oʻyinni yakunlamasangiz, qilingan oʻzgarishlar saqlanmaydi!",
          [
            { text: "Davom etish", style: "cancel", onPress: () => {} },
            {
              text: "Tark etish",
              style: "destructive",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
        return true;
      };

      navigation.addListener("beforeRemove", (e) => onBackPress(e));

      return () => navigation.removeListener("beforeRemove", onBackPress);
    }, [navigation])
  );

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
          : preScoresLength > scores.length && scores.length === 1
          ? ""
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
    data.map((game) => {
      game.scores = game.scores
        .split(" + ")
        .map((item: string) => {
          if (item) return parseInt(item);
          else return 0;
        })
        .reduce((acc: number, a: number) => acc + a, 0)
        .toString();
    });

    data.sort((a, b) => Number(b.scores) - Number(a.scores));

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

  return (
    <ScrollView style={[{ backgroundColor: "#aaffff" }, !isLight && darkBG]}>
      {isFinished ? (
        <FinishedSvoyak results={data} title={title} navigation={navigation} />
      ) : (
        <>
          <TextInput
            style={[titleInput, !isLight && lightText]}
            value={title}
            onChangeText={setTitle}
            maxLength={24}
          />
          {data && data.length ? (
            data.map((gamer) => (
              <View key={gamer.id} style={scoresWrap}>
                <TextInput
                  style={[participantInput, !isLight && lightText]}
                  value={gamer.name}
                  onChangeText={(name) => onChangeName(name, gamer.id)}
                  maxLength={16}
                />
                <View style={scoreButtonsWrap}>
                  {gamer.isActive ? (
                    scoresList.map((score) => (
                      <TouchableOpacity
                        onPress={() => onScoreButtonClicked(gamer.id, score)}
                        style={scoreButton}
                        key={score}
                      >
                        <Text style={scoreButtonText}>{score}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={[sumScores, !isLight && lightText]}>
                      {!gamer.isActive &&
                        gamer.scores
                          .split(" + ")
                          .map((score) => Number(score))
                          .reduce((acc: number, a: number) => +acc + a, 0)}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={[scores, !isLight && lightText]}
                  multiline={true}
                  value={gamer.scores}
                  onChangeText={(scores) => onChangeScore(scores, gamer.id)}
                  onFocus={() => showScoreButtons(gamer.id)}
                />
              </View>
            ))
          ) : (
            <Text></Text>
          )}
          <View style={extraButtons}>
            <TouchableOpacity
              onPress={onGamerAdded}
              disabled={canAdd}
              style={addGamer}
            >
              <Text style={textInButton}>Qoʻshish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGameFinished} style={endGame}>
              <Text style={textInButton}>Yakunlash</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Svoyak;
