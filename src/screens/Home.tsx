import { View, Text, TouchableOpacity, Pressable, Linking } from "react-native";
import { useContext } from "react";
import { styles } from "../styles/SHome";
import { ThemeContext } from "../services/ThemeContext";

const Home = ({ navigation }) => {
  const { App, title, text, button, author, created } = styles;
  const { isLight } = useContext(ThemeContext);
  console.log(isLight);

  const openLink = async () => {
    const url: string = "https://t.me/dasturchining_tundaligi";
    await Linking.openURL(url);
  };

  return (
    <View style={App}>
      <Text style={title}>Nima oʻynamoqchisiz?</Text>
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
        <Text style={created}>Created by </Text>
        <Pressable onPress={openLink}>
          <Text style={author}>Diyorbek Olimov</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
