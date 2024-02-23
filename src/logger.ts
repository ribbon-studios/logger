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

export class Logger {
  static #level: LogLevel = LogLevel.INFO;

  public static isLevel(level?: LogLevel): boolean {
    return Logger.#level >= level;
  }

  public static isNotLevel(level?: LogLevel): boolean {
    return !Logger.isLevel(level);
  }

  public static setLevel(level: LogLevel) {
    Logger.#level = level;
  }

  public static log(level: LogLevel, ...rawMessages: any[]) {
    if (Logger.isNotLevel(level)) return;

    const chalk = LEVEL_CHALK[level];

    const messages = sanitizeMessages(rawMessages).map((message) =>
      message instanceof Error ? message : chalk(message)
    );

    console.log(chalk(`[${LogLevel[level].toLowerCase()}]:`).padEnd(MAX_LENGTH, ' '), ...messages);
  }

  public static error(...message: any[]) {
    Logger.log(LogLevel.ERROR, ...message);
  }

  public static warn(...message: any[]) {
    Logger.log(LogLevel.WARN, ...message);
  }

  public static info(...message: any[]) {
    Logger.log(LogLevel.INFO, ...message);
  }

  public static silly(...message: any[]) {
    Logger.log(LogLevel.SILLY, ...message);
  }
}
