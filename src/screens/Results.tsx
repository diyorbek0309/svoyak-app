import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "../components/DeleteModal";
import { styles } from "../styles/SResults";
import { icons } from "../types/enums";
import { formatDate } from "../services/formatDate";
import { ThemeContext } from "../services/ThemeContext";

const Results = () => {
  const [games, setGames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const { isLight } = useContext(ThemeContext);
  const {
    darkBG,
    resultsWrap,
    noResults,
    singleGame,
    singleGamer,
    gameDate,
    gameTitle,
    gamerName,
    gamerScore,
    delIcon,
    lightText,
  } = styles;

  useFocusEffect(
    useCallback(() => {
      getPreGames().then((games) => {
        if (games.length) setGames(games);
      });
    }, [])
  );

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
    <ScrollView style={[resultsWrap, !isLight && darkBG]}>
      <DeleteModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        deleteSingleGame={deleteSingleGame}
        deleteID={deleteID}
      />
      {games && games.length ? (
        games.map((game) => {
          console.log(game);
          return (
            <View key={game.id} style={singleGame}>
              <View>
                <Text style={gameTitle}>{game.title}</Text>
                <TouchableOpacity
                  style={delIcon}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setDeleteID(game.id);
                  }}
                >
                  <Image source={require("../../assets/trash.png")} />
                </TouchableOpacity>
              </View>
              {game.results.length ? (
                game.results.map((result, index) => {
                  if (result.name) {
                    return (
                      <View key={result.id} style={singleGamer}>
                        <Text style={gamerName}>
                          {icons[index] || `${index + 1}.`}
                        </Text>
                        <Text style={gamerName}>{result.name}</Text>
                        <Text style={gamerScore}>{result.scores}</Text>
                      </View>
                    );
                  }
                })
              ) : (
                <Text>Natijalar yo'q</Text>
              )}
              <Text style={gameDate}>{formatDate(game.date)}</Text>
            </View>
          );
        })
      ) : (
        <Text style={[noResults, !isLight && lightText]}>
          Yakunlangan oʻyinlar yoʻq!
        </Text>
      )}
    </ScrollView>
  );
};

export default Results;
