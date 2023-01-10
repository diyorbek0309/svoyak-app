import { View, Text, TouchableOpacity, Pressable, Linking } from "react-native";
import { styles } from "../styles/SHome";

const Home = () => {
  const { App, title, text, button, author, created } = styles;
  const pressHandler = () => {};

  const openLink = async () => {
    const url: string = "https://t.me/dasturchining_tundaligi";

    await Linking.openURL(url);
  };

  return (
    <View style={App}>
      <Text style={title}>Nima o'ynamoqchisiz?</Text>
      <View>
        <TouchableOpacity style={button} onPress={pressHandler}>
          <Text style={text}>Shaxsiy o'yin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={pressHandler}>
          <Text style={text}>Erudit-kvartet</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={button} onPress={pressHandler}>
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
