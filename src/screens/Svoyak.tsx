import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../styles/SSvoyak";

const Svoyak = () => {
  const [title, setTitle] = useState("O'yin nomi");
  const [data, setData] = useState([
    { id: 0, name: "1-ishtirokchi", scores: "", numberOfLines: 2 },
    { id: 1, name: "2-ishtirokchi", scores: "", numberOfLines: 2 },
    { id: 2, name: "3-ishtirokchi", scores: "", numberOfLines: 2 },
    { id: 3, name: "4-ishtirokchi", scores: "", numberOfLines: 2 },
    { id: 4, name: "5-ishtirokchi", scores: "", numberOfLines: 2 },
  ]);

  const onChangeName = (name: string, id: number) => {
    const newData = [...data];
    newData.find((item) => item.id === id).name = name;
    setData(newData);
  };

  const onChangeScore = (scores: string, id: number) => {
    const pattern = /^[\-\+\s]*[\d\s]*[\-\+\s]*$/;
    if (pattern.test(scores)) {
      const newData = [...data];
      const preScoresLength = newData.find((item) => item.id === id).scores
        .length;
      newData.find((item) => item.id === id).scores =
        preScoresLength < scores.length && scores[scores.length - 1] === "0"
          ? scores + " + "
          : scores;
      setData(newData);
    }
  };

  const onGameFinished = () => {};

  const onGamerAdded = () => {
    if (data.length < 15) {
      const newGamer = {
        id: data.length,
        name: `${data.length + 1}-ishtirokchi`,
        scores: "",
        numberOfLines: 2,
      };
      setData([...data, newGamer]);
    }
  };

  return (
    <ScrollView>
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
            <TextInput
              style={styles.scores}
              multiline={true}
              value={gamer.scores}
              onChangeText={(scores) => onChangeScore(scores, gamer.id)}
            />
          </View>
        ))}
      <View style={styles.extraButtons}>
        <TouchableOpacity onPress={onGamerAdded} style={styles.addGamer}>
          <Text style={styles.textInButton}>Qoʻshish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGameFinished} style={styles.endGame}>
          <Text style={styles.textInButton}>Yakunlash</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Svoyak;
