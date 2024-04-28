import { useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import noImage from "./img/no-image.jpg";
import getDiscountPrice from "../../utils/getDiscountPrice";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const thumbnail = product.productPhotos.find(({ thumbnail }) => thumbnail);
  const productImage = thumbnail ? { uri: thumbnail.url } : noImage;
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <View className="w-72 self-center">
      <View>
        {isLoading && (
          <View className="absolute">
            <ActivityIndicator
              testID="notice-activity-indicator"
              size="large"
            />
          </View>
        )}
        <Image
          testID="product-image"
          source={productImage}
          onLoadEnd={handleImageLoaded}
          className="w-52 h-52"
        />
      </View>
      <Text>{product.name}</Text>
      <View className="flex-row">
        {product.onsale && (
          <Text className="text-red-600 text-bold">
            {getDiscountPrice(product.price, product.onsale.discount)}
          </Text>
        )}
        <Text className={product.onsale && "line-through"}>
          {product.price}
        </Text>
      </View>
      <View className="flex-row">
        <Text>Stock: {product.stock}</Text>
        <View className="flex-row justify-between">
          <Button title="1" />
          <Button title="2" />
        </View>
      </View>
    </View>
  );
}
