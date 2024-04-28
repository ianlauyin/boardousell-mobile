import { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function ProductPhoto({ source }) {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <View className="w-full h-72 items-center justify-center">
      <View>
        {isLoading && (
          <View className="absolute self-center">
            <ActivityIndicator
              testID="notice-activity-indicator"
              size="large"
            />
          </View>
        )}
        <Image
          style={{ resizeMode: "contain" }}
          source={source}
          onLoadEnd={handleImageLoad}
          className="w-60 h-60 self-center"
        />
      </View>
    </View>
  );
}
