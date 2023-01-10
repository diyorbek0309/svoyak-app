import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import Svoyak from "./src/screens/Svoyak";
import Results from "./src/screens/Results";
import EKvartet from "./src/screens/EKvartet";

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Svoyak Calculator" component={HomeScreen} />
        <Screen name="Shaxsiy oʻyin" component={Svoyak} />
        <Screen name="Erudit-kvartet" component={EKvartet} />
        <Screen name="Natijalar" component={Results} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
