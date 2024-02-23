import { sanitizeMessages } from '../messages';
import { stringify } from '../stringify';

describe('util(Messages)', () => {
  describe('func(sanitizeMessages)', () => {
    it('should leave strings alone', () => {
      expect(sanitizeMessages(['hello world'])).toEqual(['hello world']);
    });

    it('should errors alone', () => {
      const error = new Error('hello world');

      expect(sanitizeMessages([error])).toEqual([error]);
    });

    it('should stringify objects', () => {
      const expectedObject = { hello: 'world' };

      expect(sanitizeMessages([expectedObject])).toEqual([stringify(expectedObject)]);
    });
  });
});
