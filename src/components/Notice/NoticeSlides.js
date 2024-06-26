import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import PagerView from "react-native-pager-view";
import NoticeSlidesPage from "./NoticeSlidesPage";
import axios from "axios";
import showError from "../../utils/showError";

export default function NoticeSlides() {
  const [notices, setNotices] = useState(null);
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const noticesRes = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKENDURL}/notice/`
        );
        setNotices(noticesRes.data);
      } catch (error) {
        setNotices([]);
        showError(
          error.message,
          "Cannot load notices, Please try again later."
        );
      }
    };
    fetchNotice();
  }, []);
  return (
    <View className="w-full h-52">
      {notices ? (
        <PagerView className="flex-1 w-full h-full">
          {notices.map((notice) => (
            <NoticeSlidesPage notice={notice} key={notice.id} />
          ))}
        </PagerView>
      ) : (
        <View className="w-full h-12 self-center items-center justify-center">
          <ActivityIndicator testID="slides-activity-indicator" size="large" />
        </View>
      )}
    </View>
  );
}
