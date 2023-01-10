import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import Svoyak from "./src/screens/Svoyak";
import Results from "./src/screens/Results";
import EKvartet from "./src/screens/EKvartet";
import { eScreens } from "./src/types/enums";

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name={eScreens.HOME} component={HomeScreen} />
        <Screen name={eScreens.SVOYAK} component={Svoyak} />
        <Screen name={eScreens.EKVARTET} component={EKvartet} />
        <Screen name={eScreens.RESULTS} component={Results} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
