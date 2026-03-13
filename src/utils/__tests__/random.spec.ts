import { describe, expect, it } from 'vitest';
import { random } from '../random';

describe('util(Random)', () => {
  describe('fn(random)', () => {
    it('should produce a consistent random number from a seed', () => {
      expect(random('ribbon', 0, 255)).toEqual(136);
    });
  });
});
