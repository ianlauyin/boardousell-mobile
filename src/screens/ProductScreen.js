import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import noImage from "../../assets/img/no-image.jpg";
import { ActivityIndicator } from "react-native";
import showError from "../utils/showError";
import PagerView from "react-native-pager-view";
import axios from "axios";
import ProductPhoto from "../components/Product/ProductPhoto";
import getDiscountPrice from "../utils/getDiscountPrice";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProductScreen({ route }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [photoList, setPhotoList] = useState([]);
  const { productId } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKENDURL}/product/${productId}`
        );
        const { productPhotos, ...productDetail } = data;
        setProduct(productDetail);

        const photoListData = productPhotos.map((productPhotos) => {
          return { uri: productPhotos.url };
        });
        if (!photoListData.length) {
          photoListData.push(noImage);
        }
        setPhotoList(photoListData);
      } catch (error) {
        showError(
          error.message,
          "Cannot load Product Detail, Please try again later."
        );
      }
      setLoading(false);
    };
    fetchData();
  }, [productId]);

  if (isLoading) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView className="bg-base-100 w-full p-5">
      <View className="bg-base-300 rounded-xl p-5 mb-10">
        {photoList.length && (
          <PagerView className="w-full h-72">
            {photoList.map((source, i) => {
              console.log(i);
              return (
                <ProductPhoto
                  source={source}
                  key={`product${product.id}photo${i}`}
                />
              );
            })}
          </PagerView>
        )}
        <Text className="text-3xl py-5">{product.name}</Text>
        <Text>{product.description}</Text>
        <View className="w-full flex-row justify-between mt-8">
          <View className="flex-row ">
            <Text className="text-xl">Price: </Text>
            <Text
              className={`text-xl ${product.onsale && "line-through text-lg"}`}
            >
              ${product.price}{" "}
            </Text>
            {product.onsale && (
              <Text className="font-bold text-xl">
                ${getDiscountPrice(product.price, product.onsale.discount)}
              </Text>
            )}
          </View>
          <Text className="self-end">Stock: {product.stock}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Icon.Button
            disabled
            className="bg-base-100"
            color="black"
            size={30}
            iconStyle={{ marginLeft: 40, marginRight: 40 }}
            name="stars"
          />
          <Icon.Button
            disabled
            className="bg-base-100"
            color="black"
            size={30}
            iconStyle={{ marginLeft: 40, marginRight: 40 }}
            name="shopping-cart"
          />
        </View>
        <Text className="mt-5">Categories: </Text>
        <View className="flex-row flex-wrap ">
          {product.categories.map(({ name }) => (
            <Text className="underline ml-5 mt-2">{name}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
