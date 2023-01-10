import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../styles/SSvoyak";

const Svoyak = () => {
  const [title, setTitle] = useState("O'yin nomi");
  const [data, setData] = useState([
    { id: 1, name: "1-ishtirokchi", scores: [] },
    { id: 2, name: "2-ishtirokchi", scores: [40] },
    { id: 3, name: "3-ishtirokchi", scores: [50] },
    { id: 4, name: "4-ishtirokchi", scores: [] },
    { id: 5, name: "5-ishtirokchi", scores: [] },
  ]);

  return (
    <View>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        maxLength={24}
      />
      {data &&
        data.length &&
        data.map((part) => (
          <View key={part.id} style={styles.scoresWrap}>
            <TextInput
              style={styles.participantInput}
              value={part.name + ":"}
              onChangeText={setTitle}
              maxLength={18}
            />
            <Text style={styles.scores}>{part.scores.map((score) => score + " + ")}</Text>
          </View>
        ))}
    </View>
  );
};

export default Svoyak;
