import { Chance } from 'chance';
import { LEVEL_CHALK, LogLevel, Logger } from '../index';
import { stringify } from '../utils/stringify';

const chance = new Chance();

describe('util(Logger)', () => {
  let log: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;

  beforeEach(() => {
    log = jest.spyOn(console, 'log');

    Logger.setLevel(LogLevel.SILLY);
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

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.INFO](`[info]:  ${stringify(expectedObject)}`));
    });

    it('should not output a console log if the current log level is below the required level', () => {
      Logger.setLevel(LogLevel.ERROR);

      Logger.log(LogLevel.INFO, chance.word());

      expect(log).not.toHaveBeenCalled();
    });
  });

  describe('func(error)', () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.error(expectedMessage);

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.ERROR](`[error]: ${expectedMessage}`));
    });
  });

  describe('func(warn)', () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.warn(expectedMessage);

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.WARN](`[warn]:  ${expectedMessage}`));
    });
  });

  describe('func(info)', () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.info(expectedMessage);

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.INFO](`[info]:  ${expectedMessage}`));
    });
  });

  describe('func(silly)', () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.silly(expectedMessage);

      expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.SILLY](`[silly]: ${expectedMessage}`));
    });
  });
});
