import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function NavBar({ navigation }) {
  return (
    <View className="flex-row justify-between p-5 border-t-1 bg-footer">
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => navigation.navigate("Explore")}
      >
        <Icon
          color="black"
          size={30}
          iconStyle={{ margin: 6, marginRight: 6 }}
          name="isv"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => navigation.navigate("Home")}
      >
        <Icon
          color="black"
          size={30}
          iconStyle={{ margin: 6, marginRight: 6 }}
          name="home"
        />
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center">
        <Icon
          color="black"
          size={30}
          iconStyle={{ margin: 6, marginRight: 6 }}
          name="search1"
        />
      </TouchableOpacity>
    </View>
  );
}
