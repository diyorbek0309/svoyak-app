import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import { useState } from "react";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/Home";
import Svoyak from "./src/screens/Svoyak";
import Results from "./src/screens/Results";
import EKvartet from "./src/screens/EKvartet";
import { eScreens, eImages, eColors } from "./src/types/enums";
import { styles } from "./src/styles/SHome";
import { ThemeContext } from "./src/services/ThemeContext";

const { Navigator, Screen, Group } = createDrawerNavigator();

function App() {
  const [isLight, setIsLight] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar />
      <ThemeContext.Provider value={{ isLight }}>
        <Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: isLight ? "#ddffff" : "#12355b",
            },
            drawerInactiveTintColor: isLight ? "#12355b" : "#fff",
          }}
        >
          <Group
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: isLight ? eColors.WHITE : eColors.BLACK,
              },
              headerTitleStyle: {
                color: isLight ? eColors.BLACK : "#fff",
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <Image
                    source={isLight ? eImages.MENU_LIGHT : eImages.MENU_DARK}
                    style={styles.menuIcon}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => setIsLight(!isLight)}>
                  <Image
                    source={isLight ? eImages.MOON : eImages.SUN}
                    style={styles.modeIcon}
                  />
                </TouchableOpacity>
              ),
            })}
          >
            <Screen name={eScreens.HOME} component={HomeScreen} />
            <Screen name={eScreens.SVOYAK} component={Svoyak} />
            <Screen name={eScreens.EKVARTET} component={EKvartet} />
            <Screen name={eScreens.RESULTS} component={Results} />
          </Group>
        </Navigator>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}

export default App;
