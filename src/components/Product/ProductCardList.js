import { View } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductCardList({ products, navigation }) {
  return (
    <View>
      {products.map((product, i) => (
        <ProductCard product={product} key={i} navigation={navigation} />
      ))}
    </View>
  );
}
