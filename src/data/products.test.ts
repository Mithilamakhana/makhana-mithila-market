import { describe, expect, test } from 'bun:test';
import { products } from './products';

describe('Product review count labels', () => {
  test('shows the requested count for Makhana Mixx', () => {
    expect(products.find((product) => product.id === 'premium-makhana')?.reviewCountLabel).toBe('40+');
  });

  test('shows the requested count for Sattvik Select', () => {
    expect(products.find((product) => product.id === 'roasted-makhana')?.reviewCountLabel).toBe('60+');
  });

  test('shows the requested count for Shressth Jumbo', () => {
    expect(products.find((product) => product.id === 'flavored-makhana')?.reviewCountLabel).toBe('20+');
  });

  test('shows the requested count for Tawa Roast Makhana', () => {
    expect(products.find((product) => product.id === 'tawa-roast-makhana')?.reviewCountLabel).toBe('40+');
  });
});