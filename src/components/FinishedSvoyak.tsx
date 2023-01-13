import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../styles/SSvoyak";

const FinishedSvoyak = ({ results, title }) => {
  return (
    <ScrollView>
      <Text>{title} natijalari</Text>
      {results &&
        results.length &&
        results.map((result: any) => (
          <View key={result.id}>
            <Text>{result.name}:</Text>
            <Text>
              {result.scores
                .split(" + ")
                .map((item: string) => {
                  if (item) return parseInt(item);
                  else return 0;
                })
                .reduce((acc: number, a: number) => acc + a, 0)}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default FinishedSvoyak;
