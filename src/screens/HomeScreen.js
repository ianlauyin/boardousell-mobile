import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import NoticeSlides from "../components/Notice/NoticeSlides";
import ProductCardList from "../components/Product/ProductCardList";
import { useEffect, useState } from "react";
import showError from "../utils/showError";
import axios from "axios";

export default function HomeScreen() {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataRes = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKENDURL}/product/new`
        );
        setNewProducts(productDataRes.data.data);
      } catch (error) {
        showError(error.message, "Cannot load Product, Please try again later");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView className="bg-base-100">
      <NoticeSlides />
      <Text className="self-center text-xl font-bold my-4">New arrivals:</Text>
      <ProductCardList products={newProducts} />
    </ScrollView>
  );
}
