import { stringify } from './stringify';

export function sanitizeMessages(messages: any[]): any[] {
  return messages.map((message) => {
    if (message instanceof Error || typeof message !== 'object') {
      return message;
    }

    return stringify(message);
  });
}
