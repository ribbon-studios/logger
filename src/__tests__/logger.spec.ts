import { describe, it, expect, vi, MockInstance, beforeEach, afterEach } from 'vitest';
import { Chance } from 'chance';
import { LEVEL_CHALK, LogLevel, Logger, MAX_LENGTH } from '../index';
import { sanitizeMessages } from '../utils/messages';

const chance = new Chance();

describe('util(Logger)', () => {
  let log: MockInstance<typeof console.log>;

  beforeEach(() => {
    log = vi.spyOn(console, 'log').mockReturnValue();

    Logger.setLevel(LogLevel.SILLY);
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

  describe('func(log)', () => {
    it('should output a console log given the log level', () => {
      const expectedMessage = chance.word();

      Logger.log(LogLevel.INFO, expectedMessage);

      validate(LogLevel.INFO, expectedMessage);
    });

    it('should support objects', () => {
      const expectedObject = { hello: 'world' };

      Logger.log(LogLevel.INFO, expectedObject);

      validate(LogLevel.INFO, expectedObject);
    });

    it('should support errors', () => {
      const expectedError = new Error('Oops!');

      Logger.log(LogLevel.INFO, expectedError);

      validate(LogLevel.INFO, expectedError);
    });

    it('should not output a console log if the current log level is below the required level', () => {
      Logger.setLevel(LogLevel.ERROR);

      Logger.log(LogLevel.INFO, chance.word());

      expect(log).not.toHaveBeenCalled();
    });
  });

  describe(`func(silly)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.silly(expectedMessage);

      validate(LogLevel.SILLY, expectedMessage);
    });
  });

  describe(`func(info)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.info(expectedMessage);

      validate(LogLevel.INFO, expectedMessage);
    });
  });

  describe(`func(warn)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.warn(expectedMessage);

      validate(LogLevel.WARN, expectedMessage);
    });
  });

  describe(`func(error)`, () => {
    it('should output a console log with the expected level', () => {
      const expectedMessage = chance.word();

      Logger.error(expectedMessage);

      validate(LogLevel.ERROR, expectedMessage);
    });
  });
});
