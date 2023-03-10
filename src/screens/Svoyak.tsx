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
import { sortResults } from "../services/sortResults";

const Svoyak = ({ navigation }) => {
  const [data, setData] = useState<ISvoyakData[]>([]);
  const [title, setTitle] = useState("Oʻyin nomi");
  const [canAdd, setCanAdd] = useState(false);
  const [autocompleteNames, setAutocompleteNames] = useState([]);
  const [showHint, setShowHint] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [gamers, setGamers] = useState([]);
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
          isLife: false,
        });
      }
      setData(defaultData);
      setTitle("Oʻyin nomi");
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
    getPreGames().then((storedGames) => {
      addNewGame(storedGames);
    });
    let isFinishable = false;
    data.map((gamer) => {
      if (gamer.name.length) {
        isFinishable = true;
        return;
      }
    });

    let newData: ISvoyakData[] = [...data];
    newData.map((gamer) => {
      gamer.isLife = gamer.scores.length > 1;
    });

    setData(newData);

    try {
      if (title.length && isFinishable) {
        setIsFinished(true);
      } else {
        Alert.alert(
          "Ogohlantirish",
          "Oʻyinni yakunlash uchun kamida bitta ishtirokchi ismi kiritilishi kerak!",
          [{ text: "Kiritish", style: "cancel", onPress: () => {} }]
        );
      }
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
        isLife: false,
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

  const onClickHint = (gamerID: number, name: string) => {
    const newData: ISvoyakData[] = [...data];
    newData.find((item) => item.id === gamerID).name = name;

    loadNames();
    setData(newData);
    setShowHint(null);
  };

  const addNewGame = async (games) => {
    let storedNames = [],
      newGamers = [];
    newGamers = sortResults(data);
    setGamers(newGamers);

    const game = {
      id: games.length,
      title,
      date: Date.now(),
      results: newGamers,
      isFinished: true,
    };

    games.push(game);

    AsyncStorage.getItem("names").then(async (data) => {
      storedNames = data != null ? JSON.parse(data) : ["Diyorbek"];
      newGamers.map((gamer) => {
        if (!storedNames.includes(gamer.name)) {
          storedNames.push(gamer.name);
        }
      });
      await AsyncStorage.setItem("names", JSON.stringify(storedNames));
    });

    await AsyncStorage.setItem("games", JSON.stringify(games));
  };

  const getPreGames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("games");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={[{ backgroundColor: "#aaffff" }, !isLight && darkBG]}>
      {isFinished ? (
        <FinishedSvoyak gamers={gamers} title={title} navigation={navigation} />
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
                    autocompleteNames.map((name, index) => (
                      <TouchableOpacity
                        key={index}
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
                  showSoftInputOnFocus={false}
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
