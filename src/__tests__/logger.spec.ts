import { Chance } from 'chance';
import { LEVEL_CHALK, LogLevel, Logger } from '../logger';
import { stringify } from '../utils/stringify';

const chance = new Chance();

describe('util(Logger)', () => {
  let log: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;

  beforeEach(() => {
    log = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('func(log)', () => {
    it('should output a console log given the log level', () => {
      const expectedMessage = chance.word();

      Logger.log(LogLevel.INFO, expectedMessage);

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.INFO](`[info]:  ${expectedMessage}`));
    });

    it('should support objects', () => {
      const expectedObject = { hello: 'world' };

      Logger.log(LogLevel.INFO, expectedObject);

      expect(log).toHaveBeenCalledWith(
        LEVEL_CHALK[LogLevel.INFO](`[info]:  ${stringify(expectedObject)}`)
      );
    });

    it('should not output a console log if the current log level is below the required level', () => {
      Logger.setLevel(LogLevel.ERROR);

      Logger.log(LogLevel.INFO, chance.word());

      expect(log).not.toHaveBeenCalled();
    });
  });
});
