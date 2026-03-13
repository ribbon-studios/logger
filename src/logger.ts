import chalk, { ChalkInstance } from 'chalk';
import { sanitizeMessages } from './utils/messages';
import { random } from './utils/random';

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  SILLY,
}

export const MAX_LENGTH =
  Object.keys(LogLevel).reduce((output, value) => {
    return Math.max(output, value.length);
  }, 0) + 2;

export const LEVEL_CHALK: {
  [key in LogLevel]: ChalkInstance;
} = {
  [LogLevel.ERROR]: chalk.red,
  [LogLevel.WARN]: chalk.yellow,
  [LogLevel.INFO]: chalk.cyan,
  [LogLevel.SILLY]: chalk.magenta,
};

/**
 * A simple wrapper around 'console.log'
 */
export class RibbonLogger {
  #options: RibbonLogger.Options;
  readonly prefix?: string;

  /**
   * @param scope prefixes the messages with the given scope
   */
  constructor(scope?: string);
  constructor(options?: Partial<RibbonLogger.Options>);
  constructor(options?: string | Partial<RibbonLogger.Options>) {
    this.#options = {
      level: LogLevel.INFO,
      ...(typeof options === 'string' ? { scope: options } : options),
    };

    if (this.#options.scope) {
      const color = chalk.rgb(
        random(`${this.#options.scope}:r`, 0, 255),
        random(`${this.#options.scope}:g`, 0, 255),
        random(`${this.#options.scope}:b`, 0, 255)
      );

      this.prefix = color(`[${this.#options.scope}]`);
    }
  }

  /**
   * Returns whether the logger is configured to allow the given log level to output.
   * @param level the level to validate
   * @returns true if the given level is equal to or higher priority then the configured level
   *
   * @example
   * Logger.setLevel(LogLevel.INFO);
   * // Returns true
   * Logger.isLevel(LogLevel.ERROR);
   * // Also returns true
   * Logger.isLevel(LogLevel.INFO);
   */
  public isLevel(level?: LogLevel): boolean {
    return level != undefined && this.#options.level >= level;
  }

  /**
   * Returns whether the logger is configured to deny the given log level to output.
   * @param level the level to validate
   * @returns true if the given level is lower priority then the configured level
   */
  public isNotLevel(level?: LogLevel): boolean {
    return !this.isLevel(level);
  }

  /**
   * Sets the level to allow to output
   * @param level the level to set
   */
  public setLevel(level: LogLevel) {
    this.#options.level = level;
  }

  /**
   * A wrapper around console.log with color formatting and filtering by the set LogLevel.
   * @param level the LogLevel of this message
   * @param rawMessages the messages to send
   */
  public log(level: LogLevel, ...rawMessages: any[]): void {
    if (this.isNotLevel(level)) return;

    const chalk = LEVEL_CHALK[level];

    const messages = sanitizeMessages(rawMessages).map((message) =>
      message instanceof Error ? message : chalk(message)
    );

    const prefix = [chalk(`[${LogLevel[level].toLowerCase()}]`.padStart(MAX_LENGTH, ' ')), this.prefix, ':']
      .filter(Boolean)
      .join('');

    console.log(prefix, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.ERROR}
   * @param messages the messages to send
   */
  public error(...messages: any[]) {
    this.log(LogLevel.ERROR, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.WARN}
   * @param messages the messages to send
   */
  public warn(...messages: any[]) {
    this.log(LogLevel.WARN, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.INFO}
   * @param messages the messages to send
   */
  public info(...messages: any[]) {
    this.log(LogLevel.INFO, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.SILLY}
   * @param messages the messages to send
   */
  public silly(...messages: any[]) {
    this.log(LogLevel.SILLY, ...messages);
  }
}

export namespace RibbonLogger {
  export type Options = {
    scope?: string;
    level: LogLevel;
  };
}

export const logger = new RibbonLogger();
