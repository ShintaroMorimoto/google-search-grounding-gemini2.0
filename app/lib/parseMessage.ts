import type { MessagePart } from '../types/chat';

export function parseMessage(message: string): MessagePart[] {
  const parts: MessagePart[] = [];

  // より柔軟な正規表現パターン
  const linkRegex = /<a([^>]*)>([^<]+)<\/a>/g;
  const hrefRegex = /href="([^"]*)"/;
  const classRegex = /class="([^"]*)"/;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  match = linkRegex.exec(message);
  while (match !== null) {
    // マッチの前のテキストを追加
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.slice(lastIndex, match.index),
      });
    }

    const attributes = match[1];
    const content = match[2];

    // href属性を抽出
    const hrefMatch = attributes.match(hrefRegex);
    const href = hrefMatch ? hrefMatch[1] : '';

    // class属性を抽出
    const classMatch = attributes.match(classRegex);
    const className = classMatch ? classMatch[1] : '';

    // リンクを追加
    parts.push({
      type: 'link',
      content: content,
      href: href,
      className: className || undefined,
    });

    lastIndex = match.index + match[0].length;
    match = linkRegex.exec(message);
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
