import { describe, it, expect, vi, MockInstance, beforeEach, afterEach } from 'vitest';
import { Chance } from 'chance';
import { LEVEL_CHALK, LogLevel, logger, MAX_LENGTH, RibbonLogger } from '../index';
import { sanitizeMessages } from '../utils/messages';

const chance = new Chance();

describe('util(Logger)', () => {
  let log: MockInstance<typeof console.log>;

  beforeEach(() => {
    log = vi.spyOn(console, 'log').mockReturnValue();

    logger.setLevel(LogLevel.SILLY);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function validate(level: LogLevel, ...messages: any[]): void {
    const chalk = LEVEL_CHALK[level];

    expect(log).toHaveBeenCalledWith(
      chalk(`[${LogLevel[level].toLowerCase()}]:`).padEnd(MAX_LENGTH, ' '),
      ...sanitizeMessages(messages).map((message) => (message instanceof Error ? message : chalk(message)))
    );
  }

  describe('constructor(RibbonLogger)', () => {
    it('should support custom loggers', () => {
      const expectedString = 'hello world';

      const logger = new RibbonLogger();

      logger.log(LogLevel.INFO, expectedString);

      validate(LogLevel.INFO, expectedString);
    });

    it('should support scopes', () => {
      const expectedString = 'hello world';

      const logger = new RibbonLogger('scope');

      logger.info(expectedString);

      const chalk = LEVEL_CHALK[LogLevel.INFO];

      expect(log).toHaveBeenCalledWith(
        [logger.prefix, chalk(`[${LogLevel[LogLevel.INFO].toLowerCase()}]:`).padEnd(MAX_LENGTH, ' ')].join(''),
        expectedString
      );
    });
  });

  describe('func(log)', () => {
    it('should output a console log given the log level', () => {
      const expectedMessage = chance.word();

      logger.log(LogLevel.INFO, expectedMessage);

      validate(LogLevel.INFO, expectedMessage);
    });

    it('should support objects', () => {
      const expectedObject = { hello: 'world' };

      logger.log(LogLevel.INFO, expectedObject);

      validate(LogLevel.INFO, expectedObject);
    });

    it('should support errors', () => {
      const expectedError = new Error('Oops!');

      logger.log(LogLevel.INFO, expectedError);

      validate(LogLevel.INFO, expectedError);
    });

    it('should not output a console log if the current log level is below the required level', () => {
      logger.setLevel(LogLevel.ERROR);

      logger.log(LogLevel.INFO, chance.word());

      expect(log).not.toHaveBeenCalled();
    });
  });

  describe(`func(silly)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      logger.silly(expectedMessage);

      validate(LogLevel.SILLY, expectedMessage);
    });
  });

  describe(`func(info)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      logger.info(expectedMessage);

      validate(LogLevel.INFO, expectedMessage);
    });
  });

  describe(`func(warn)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      logger.warn(expectedMessage);

      validate(LogLevel.WARN, expectedMessage);
    });
  });

  describe(`func(error)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      logger.error(expectedMessage);

      validate(LogLevel.ERROR, expectedMessage);
    });
  });
});
