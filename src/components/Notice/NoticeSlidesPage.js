import { ActivityIndicator, Image, Text, View } from "react-native";
import defaultImage from "./img/notice-default.png";
import { useState } from "react";

export default function NoticeSlidesPage({ notice }) {
  const [isLoading, setIsLoading] = useState(true);
  const noticeImage = notice.url ? { uri: notice.url } : defaultImage;
  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  return (
    <View className="w-full h-full flex-1 justify-center items-center">
      <Text className="text-2xl">{notice.title}</Text>
      <View className="w-full h-44">
        {isLoading && (
          <View className="absolute">
            <ActivityIndicator
              testID="notice-activity-indicator"
              size="large"
            />
          </View>
        )}
        <Image
          testID="notice-image"
          source={noticeImage}
          onLoadEnd={handleImageLoaded}
          className="w-full h-full"
        />
      </View>
    </View>
  );
}
