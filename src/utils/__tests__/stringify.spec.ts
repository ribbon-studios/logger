import { stringify } from '../stringify';
import dedent from 'string-dedent';

describe('util(Stringify)', () => {
  describe('func(stringify)', () => {
    it('should stringify objects', () => {
      const expectedValue = dedent`
        {
            "hello": "world"
        }
      `;

      expect(stringify({ hello: 'world' })).toEqual(expectedValue);
    });

    it('should ignore circular references', () => {
      const myValue: any = {
        hello: 'world',
      };

      myValue.circular = myValue;

      const expectedValue = dedent`
        {
            "hello": "world"
        }
      `;

      expect(stringify(myValue)).toEqual(expectedValue);
    });
  });
});
