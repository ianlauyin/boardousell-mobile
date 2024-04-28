import { View } from "react-native";
import ProductCard from "./ProductCards";

export default function ProductCardList({ products }) {
  return (
    <View>
      {products.map((product, i) => (
        <ProductCard product={product} key={i} />
      ))}
    </View>
  );
}
