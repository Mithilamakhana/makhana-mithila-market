export interface PricedCartItem {
  productId: string;
  quantity: number;
}

export const FESTIVAL_DISCOUNT_PER_PACKET = 150;

const festivalEligibleProductIds = new Set([
  'premium-makhana',
  'roasted-makhana',
  'flavored-makhana',
]);

export const isFestivalEligibleProduct = (productId: string) =>
  festivalEligibleProductIds.has(productId);

export const getFestivalEligiblePacketCount = (items: PricedCartItem[]) =>
  items.reduce(
    (count, item) => count + (isFestivalEligibleProduct(item.productId) ? item.quantity : 0),
    0,
  );

export const getDiscountedUnitPrice = (productId: string, price: number) =>
  price - (isFestivalEligibleProduct(productId) ? FESTIVAL_DISCOUNT_PER_PACKET : 0);

export const calculateCartDiscount = (items: PricedCartItem[]) => {
  const eligiblePackets = getFestivalEligiblePacketCount(items);
  const totalPackets = items.reduce((count, item) => count + item.quantity, 0);
  const trioBonus = totalPackets >= 3 ? 100 : 0;

  return eligiblePackets * FESTIVAL_DISCOUNT_PER_PACKET + trioBonus;
};