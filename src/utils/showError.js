import { Alert } from "react-native";

export default function showError(title, message) {
  if (!title) {
    title = "Error";
  }
  if (!message) {
    message = "Please try again later.";
  }
  return Alert.alert(title, message, [{ text: "OK" }, { text: "Cancel" }]);
}
