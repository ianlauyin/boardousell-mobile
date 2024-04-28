import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import NavBar from "./src/components/Navigation/NavBar";
import ExploreScreen from "./src/screens/ExploreScreen";
import ProductScreen from "./src/screens/ProductScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <NavBar {...props} />}
        screenOptions={{
          headerStatusBarHeight: 0,
          title: "",
          headerStyle: { backgroundColor: "#e5e9f0" },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Product" component={ProductScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
