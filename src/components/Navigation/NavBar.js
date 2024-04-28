import { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function NavBar({ navigation }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchIconPress = () => {
    setShowSearchBar((prev) => !prev);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    setShowSearchBar(false);
    navigation.navigate("Explore", { search: searchText });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {showSearchBar && (
        <View>
          <TextInput
            className="p-2 pl-5 text-xl bg-base-300"
            value={searchText}
            onChangeText={handleSearchTextChange}
            onEndEditing={handleSearchIconPress}
            onSubmitEditing={handleSearch}
            placeholder="Search Products..."
            autoFocus
          />
        </View>
      )}
      <View className="flex-row justify-between p-5 border-t-1 bg-footer">
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => navigation.navigate("Explore", { serach: null })}
        >
          <MaterialIcon
            color="black"
            size={30}
            iconStyle={{ margin: 6, marginRight: 6 }}
            name="explore"
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
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={handleSearchIconPress}
        >
          <Icon
            color="black"
            size={30}
            iconStyle={{ margin: 6, marginRight: 6 }}
            name="search1"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
