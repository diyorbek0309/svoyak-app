import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Linking,
  Image,
} from "react-native";
import { styles } from "../styles/SHome";
import { eColors, eImages } from "../types/enums";

const Home = ({ navigation }) => {
  const [isLight, setIsLight] = useState(true);
  const { App, title, text, button, author, created } = styles;

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerStyle: {
  //       backgroundColor: isLight ? eColors.WHITE : eColors.BLACK,
  //     },
  //     headerTitleStyle: {
  //       color: isLight ? eColors.BLACK : eColors.WHITE,
  //     },
  //     // headerLeft: () => (
  //     //   <CustomBtn
  //     //     image={eImages.MENU}
  //     //     pressHandler={() => navigation.toggleDrawer()}
  //     //   />
  //     // ),
  //     headerRight: () => (
  //       <View>
  //         <TouchableOpacity>
  //           <Image source={isLight ? eImages.MOON : eImages.SUN} />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //   });
  // }, [navigation, isLight]);

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
