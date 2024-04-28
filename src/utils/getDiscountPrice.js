export default function getDiscountPrice(price, discount) {
  if (typeof price !== "number" || typeof discount !== "number") {
    return null;
  }
  return price * discount;
}
