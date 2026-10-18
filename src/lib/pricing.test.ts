import { describe, expect, test } from 'bun:test';
import {
  calculateCartDiscount,
  getDiscountedUnitPrice,
} from './pricing';

describe('Festival Offer pricing', () => {
  test('Tawa Roast Makhana stays at ₹850 with no per-packet offer', () => {
    expect(getDiscountedUnitPrice('tawa-roast-makhana', 850)).toBe(850);
    expect(calculateCartDiscount([{ productId: 'tawa-roast-makhana', quantity: 1 }])).toBe(0);
  });

  test('eligible products receive ₹150 off each and three packets unlock the extra ₹100', () => {
    expect(getDiscountedUnitPrice('premium-makhana', 450)).toBe(300);
    expect(calculateCartDiscount([
      { productId: 'flavored-makhana', quantity: 1 },
      { productId: 'roasted-makhana', quantity: 1 },
      { productId: 'premium-makhana', quantity: 1 },
    ])).toBe(550);
  });
});