import { Chalk, red, yellow, cyan, magenta } from 'chalk';
import { sanitizeMessages } from './utils/messages';

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  SILLY,
}

export const MAX_LENGTH =
  Object.keys(LogLevel).reduce((output, value) => {
    return Math.max(output, value.length);
  }, 0) + 3;

export const LEVEL_CHALK: {
  [key in LogLevel]: Chalk;
} = {
  [LogLevel.ERROR]: red,
  [LogLevel.WARN]: yellow,
  [LogLevel.INFO]: cyan,
  [LogLevel.SILLY]: magenta,
};

/**
 * A simple wrapper around 'console.log'
 */
export class Logger {
  static #level: LogLevel = LogLevel.INFO;

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
  public static isLevel(level?: LogLevel): boolean {
    return Logger.#level >= level;
  }

  /**
   * Returns whether the logger is configured to deny the given log level to output.
   * @param level the level to validate
   * @returns true if the given level is lower priority then the configured level
   */
  public static isNotLevel(level?: LogLevel): boolean {
    return !Logger.isLevel(level);
  }

  /**
   * Sets the level to allow to output
   * @param level the level to set
   */
  public static setLevel(level: LogLevel) {
    Logger.#level = level;
  }

  /**
   * A wrapper around console.log with color formatting and filtering by the set LogLevel.
   * @param level the LogLevel of this message
   * @param rawMessages the messages to send
   */
  public static log(level: LogLevel, ...rawMessages: any[]): void {
    if (Logger.isNotLevel(level)) return;

    const chalk = LEVEL_CHALK[level];

    const messages = sanitizeMessages(rawMessages).map((message) =>
      message instanceof Error ? message : chalk(message)
    );

    console.log(chalk(`[${LogLevel[level].toLowerCase()}]:`).padEnd(MAX_LENGTH, ' '), ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.ERROR}
   * @param messages the messages to send
   */
  public static error(...messages: any[]) {
    Logger.log(LogLevel.ERROR, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.WARN}
   * @param messages the messages to send
   */
  public static warn(...messages: any[]) {
    Logger.log(LogLevel.WARN, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.INFO}
   * @param messages the messages to send
   */
  public static info(...messages: any[]) {
    Logger.log(LogLevel.INFO, ...messages);
  }

  /**
   * A helper that automatically calls {@link Logger.log} with {@link LogLevel.SILLY}
   * @param messages the messages to send
   */
  public static silly(...messages: any[]) {
    Logger.log(LogLevel.SILLY, ...messages);
  }
}
