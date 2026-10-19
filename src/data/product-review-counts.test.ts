import { describe, expect, test } from 'bun:test';
import { productReviewCountLabels } from './product-review-counts';

describe('Product review count labels', () => {
  test('uses the requested label for Makhana Mixx', () => {
    expect(productReviewCountLabels['premium-makhana']).toBe('40+');
  });

  test('uses the requested label for Sattvik Select', () => {
    expect(productReviewCountLabels['roasted-makhana']).toBe('60+');
  });

  test('uses the requested label for Shressth Jumbo', () => {
    expect(productReviewCountLabels['flavored-makhana']).toBe('20+');
  });

  test('uses the requested label for Tawa Roast Makhana', () => {
    expect(productReviewCountLabels['tawa-roast-makhana']).toBe('40+');
  });
});