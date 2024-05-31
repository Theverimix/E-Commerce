export const calculateDiscountedPrice = (price, sale) => {
  if (!sale) {
    return price;
  }

  const { discountType, discountValue } = sale;

  if (discountType === "PERCENTAGE") {
    const discountAmount = (price * discountValue) / 100;
    const discountedPrice = price - discountAmount;
    return discountedPrice.toFixed(2);
  } else if (discountType === "CASH") {
    return price - discountValue;
  }
};
