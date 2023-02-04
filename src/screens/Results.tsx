import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "../components/DeleteModal";
import { styles } from "../styles/SResults";
import { icons } from "../types/enums";
import { formatDate } from "../services/formatDate";

const Results = () => {
  const [games, setGames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  useEffect(() => {
    getPreGames().then((games) => {
      if (games.length) setGames(games);
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

  const deleteSingleGame = async (id: number) => {
    const newGames = games.filter((game) => id !== game.id);
    setGames(newGames);
    setModalVisible(!modalVisible);
    await AsyncStorage.setItem("games", JSON.stringify(newGames));
  };

  return (
    <ScrollView style={styles.resultsWrap}>
      <DeleteModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        deleteSingleGame={deleteSingleGame}
        deleteID={deleteID}
      />
      {games && games.length ? (
        games.map((game) => (
          <View key={game.id} style={styles.singleGame}>
            <View>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <TouchableOpacity
                style={styles.delIcon}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setDeleteID(game.id);
                }}
              >
                <Image source={require("../../assets/trash.png")} />
              </TouchableOpacity>
            </View>
            {game.results.length ? (
              game.results.map((result, index) => (
                <View key={result.id} style={styles.singleGamer}>
                  <Text style={styles.gamerName}>
                    {icons[index] || `${index + 1}.`}
                  </Text>
                  <Text style={styles.gamerName}>{result.name}</Text>
                  <Text style={styles.gamerScore}>{result.scores}</Text>
                </View>
              ))
            ) : (
              <Text>Natijalar yo'q</Text>
            )}
            <Text style={styles.gameDate}>{formatDate(game.date)}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>Yakunlangan oʻyinlar yoʻq!</Text>
      )}
    </ScrollView>
  );
};

export default Results;
