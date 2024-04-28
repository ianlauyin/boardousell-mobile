import { SafeAreaView } from "react-native";
import ProductCard from "./ProductCards";

export default function ProductCardList({ products }) {
  return (
    <SafeAreaView>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </SafeAreaView>
  );
}
