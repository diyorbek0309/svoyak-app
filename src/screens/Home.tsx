import { View, Text, TouchableOpacity, Pressable, Linking } from "react-native";
import { useContext } from "react";
import { styles } from "../styles/SHome";
import { ThemeContext } from "../services/ThemeContext";

const Home = ({ navigation }) => {
  const { App, title, text, button, author, created, darkBG, lightText } =
    styles;
  const { isLight } = useContext(ThemeContext);

  const openLink = async () => {
    const url: string = "https://t.me/dasturchining_tundaligi";
    await Linking.openURL(url);
  };

  return (
    <View style={[App, !isLight && darkBG]}>
      <Text style={[title, !isLight && lightText]}>Nima oʻynamoqchisiz?</Text>
      <View>
        <TouchableOpacity
          style={button}
          onPress={() => navigation.navigate("Shaxsiy oʻyin")}
        >
          <Text style={text}>Shaxsiy oʻyin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={button}
          onPress={() => navigation.navigate("Erudit-kvartet")}
        >
          <Text style={text}>Erudit-kvartet</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={button}
          onPress={() => navigation.navigate("Natijalar")}
        >
          <Text style={text}>Natijalar</Text>
        </TouchableOpacity>
        <Text style={[created, !isLight && lightText]}>Created by </Text>
        <Pressable onPress={openLink}>
          <Text style={[author, !isLight && lightText]}>Diyorbek Olimov</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
