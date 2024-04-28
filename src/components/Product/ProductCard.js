import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import noImage from "../../../assets/img/no-image.jpg";
import getDiscountPrice from "../../utils/getDiscountPrice";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProductCard({ product, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const thumbnail = product.productPhotos.find(({ thumbnail }) => thumbnail);
  const productImage = thumbnail ? { uri: thumbnail.url } : noImage;
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <View className="w-72 mb-8 self-center bg-accent rounded-xl p-5">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Product", { productId: product.id })
        }
      >
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
            testID="product-image"
            source={productImage}
            onLoadEnd={handleImageLoaded}
            style={{ resizeMode: "contain" }}
            className="w-52 h-52 self-center"
          />
        </View>
        <Text className="text-xl mt-2">{product.name}</Text>
        <View className="flex-row ">
          {product.onsale && (
            <Text className="text-red-600 font-bold">
              HKD${getDiscountPrice(product.price, product.onsale.discount)}
            </Text>
          )}
          <Text className={product.onsale && "line-through"}>
            HK${product.price}
          </Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row mt-2">
        <Text className="self-end flex-1">Stock: {product.stock}</Text>
        <View className="flex-row justify-between flex-1">
          <Icon.Button
            disabled
            className="bg-base-100"
            color="black"
            size={30}
            iconStyle={{ margin: 6, marginRight: 6 }}
            name="stars"
          />
          <Icon.Button
            disabled
            className="bg-base-100"
            color="black"
            size={30}
            iconStyle={{ margin: 6, marginRight: 6 }}
            name="shopping-cart"
          />
        </View>
      </View>
    </View>
  );
}
