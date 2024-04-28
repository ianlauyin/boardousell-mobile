import { FlatList, SafeAreaView } from "react-native";
import ProductCard from "./ProductCards";

export default function ProductCardList({ products }) {
  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(product) => product.id}
      />
    </SafeAreaView>
  );
}
