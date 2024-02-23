import { Chance } from 'chance';
import { LEVEL_CHALK, LogLevel, Logger, MAX_LENGTH } from '../index';
import { sanitizeMessages } from '../utils/messages';

const chance = new Chance();

describe('util(Logger)', () => {
  let log: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockReturnValue(null);

    Logger.setLevel(LogLevel.SILLY);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  const levels = Object.values(LogLevel).filter((value) => !isNaN(Number(value))) as LogLevel[];

  for (const level of levels) {
    const name = LogLevel[level].toLowerCase();

    describe(`func(${name})`, () => {
      it('should output a console log with the expected level', () => {
        const expectedMessage = chance.word();

        Logger[name](expectedMessage);

        validate(level, expectedMessage);
      });
    });
  }
});
