import { useState, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FinishedSvoyak from "../components/FinishedSvoyak";
import { styles } from "../styles/SSvoyak";
import { ISvoyakData } from "../types/Props.interface";
import { eSvoyak, scoresList } from "../types/enums";
import { ThemeContext } from "../services/ThemeContext";
import { sumScoresFN } from "../services/sumScores";

const Svoyak = ({ navigation }) => {
  const [data, setData] = useState<ISvoyakData[]>([]);
  const [title, setTitle] = useState("Oʻyin nomi");
  const [canAdd, setCanAdd] = useState(false);
  const [autocompleteNames, setAutocompleteNames] = useState(["O. Diyorbek"]);
  const [showHint, setShowHint] = useState(null);
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
    minusButton,
    minusText,
    hintsWrap,
    hintButton,
    hintText,
  } = styles;

  useFocusEffect(
    useCallback(() => {
      setIsFinished(false);
      const defaultData = [];
      for (let i = 0; i < 5; i++) {
        defaultData.push({
          id: i,
          name: ``,
          scores: "",
          numberOfLines: 2,
          isActive: false,
        });
      }
      setData(defaultData);
      setShowHint(null);

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          Alert.alert(
            "Davom ettirilsinmi?",
            "Oʻyinni yakunlamasangiz, qilingan oʻzgarishlar saqlanmaydi!",
            [
              { text: "Davom etish", style: "cancel", onPress: () => {} },
              {
                text: "Tark etish",
                style: "destructive",
                onPress: () => navigation.goBack(),
              },
            ]
          );
          return true;
        }
      );

      loadNames();

      return () => backHandler.remove();
    }, [navigation])
  );

  const onChangeName = (name: string, id: number) => {
    const newData: ISvoyakData[] = [...data];
    newData.find((item) => item.id === id).name = name;
    if (name.length) {
      const filteredNames = autocompleteNames.filter((n) => n.includes(name));
      setAutocompleteNames(filteredNames);
      setShowHint(id);
      setData(newData);
    } else {
      loadNames();
      setShowHint(null);
    }
  };

  const loadNames = async () => {
    const storedNames = await AsyncStorage.getItem("names");
    if (storedNames) {
      setAutocompleteNames(JSON.parse(storedNames));
    }
  };

  const onFocus = (id: number) => {
    if (id !== showHint) setShowHint(null);
  };

  const onChangeScore = (scores: string, id: number) => {
    const pattern = /^[\-\+\s]*[\d\s]*[\-\+\s]*$/;
    if (pattern.test(scores[scores.length - 1])) {
      console.log(scores);
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

  const onScoreButtonClicked = (gamerID: number, score: string) => {
    const newData: ISvoyakData[] = [...data];
    const preLength = newData.find((item) => item.id === gamerID).scores.length;
    if (score === "-") {
      if (
        newData.find((item) => item.id === gamerID).scores[preLength - 1] !==
        "-"
      ) {
        newData.find((item) => item.id === gamerID).scores += score;
      }
    } else {
      newData.find((item) => item.id === gamerID).scores += score + " + ";
    }

    setData(newData);
  };

  const onGameFinished = async () => {
    let newData = [];
    if (title.length) {
      newData = data.map((gamer, index) => {
        if (!gamer.name.length) {
          gamer.name = `${index + 1}-ishtirokchi`;
        }
        return gamer;
      });

      setData(newData);
      setIsFinished(true);
    }
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
    const autoNames = [...autocompleteNames];
    data.map((game) => {
      game.scores = game.scores
        .split(" + ")
        .map((item: string) => {
          if (item) return parseInt(item);
          else return 0;
        })
        .reduce((acc: number, a: number) => acc + a, 0)
        .toString();

      autoNames.push(game.name);
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

    await AsyncStorage.setItem("names", JSON.stringify(autoNames));
    await AsyncStorage.setItem("games", JSON.stringify(games));
  };

  const onClickHint = (gamerID, name) => {
    const newData: ISvoyakData[] = [...data];
    newData.find((item) => item.id === gamerID).name = name;

    loadNames();
    setData(newData);
    setShowHint(null);
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
            placeholder="Oʻyin nomi"
          />
          {data && data.length ? (
            data.map((gamer) => (
              <View key={gamer.id} style={scoresWrap}>
                <TextInput
                  style={[participantInput, !isLight && lightText]}
                  value={gamer.name}
                  onChangeText={(name) => onChangeName(name, gamer.id)}
                  onFocus={() => onFocus(gamer.id)}
                  maxLength={14}
                  placeholder={`${gamer.id + 1}-ishtirokchi`}
                />
                <View style={hintsWrap}>
                  {showHint === gamer.id &&
                    autocompleteNames.map((name) => (
                      <TouchableOpacity
                        key={name}
                        style={hintButton}
                        onPress={() => onClickHint(gamer.id, name)}
                      >
                        <Text style={hintText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
                <View style={scoreButtonsWrap}>
                  {gamer.isActive ? (
                    scoresList.map((score, index) => (
                      <TouchableOpacity
                        onPress={() => onScoreButtonClicked(gamer.id, score)}
                        style={[scoreButton, index === 0 && minusButton]}
                        key={score}
                      >
                        <Text
                          style={[scoreButtonText, index === 0 && minusText]}
                        >
                          {score}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={[sumScores, !isLight && lightText]}>
                      {!gamer.isActive && sumScoresFN(gamer.scores)}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={[scores, !isLight && lightText]}
                  multiline={true}
                  value={gamer.scores}
                  onChangeText={(scores) => onChangeScore(scores, gamer.id)}
                  onFocus={() => showScoreButtons(gamer.id)}
                  placeholder="Ball"
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
