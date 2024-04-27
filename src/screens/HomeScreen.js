import { ScrollView, Text, View } from "react-native";
import NoticeSlides from "../components/NoticeSlides";

export default function HomeScreen() {
  return (
    <ScrollView>
      <NoticeSlides />
    </ScrollView>
  );
}
