import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import showError from "../utils/showError";
import axios from "axios";
import ProductCardList from "../components/Product/ProductCardList";

const resultPerPage = 5;
const scrollThrottleValue = 1;
export default function ExploreScreen({ navigation, route }) {
  const { search } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadProduct(currentPage);
  }, [currentPage]);

  const loadProduct = async () => {
    setIsLoading(true);
    try {
      let data;
      if (search) {
        data = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKENDURL}/product/search?keyword=${search}&limit=${resultPerPage}&page=${currentPage}`
        );
      } else {
        data = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKENDURL}/product/search?limit=${resultPerPage}&page=${currentPage}`
        );
      }

      setProducts((prev) => [...prev, ...data.data.data]);
    } catch (error) {
      showError(error.message, "Cannot load products, Please try again later");
    }
    setIsLoading(false);
  };

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isScrolledToBottom && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={scrollThrottleValue}
    >
      <Text className="text-xl font-bold p-5">All Products:</Text>
      <ProductCardList products={products} navigation={navigation} />
      {isLoading && <ActivityIndicator size="large" />}
    </ScrollView>
  );
}
