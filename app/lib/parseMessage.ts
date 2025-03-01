import type { MessagePart } from '../types/googleSearchGrounding';

export function parseMessage(message: string): MessagePart[] {
  const parts: MessagePart[] = [];
  const linkRegex =
    /<a[^>]*href="([^"]+)"[^>]*style="[^"]*"[^>]*>([^<]+)<\/a>/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(message)) !== null) {
    // マッチの前のテキストを追加
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.slice(lastIndex, match.index),
      });
    }

    // リンクを追加
    parts.push({
      type: 'link',
      content: match[2], // リンクテキスト
      href: match[1], // href属性
    });

    lastIndex = match.index + match[0].length;
  }

  // 残りのテキストを追加
  if (lastIndex < message.length) {
    parts.push({
      type: 'text',
      content: message.slice(lastIndex),
    });
  }

  return parts;
}
