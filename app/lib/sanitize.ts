export function sanitizeHtml(html: string): string {
  // 基本的なサニタイズ処理
  // より厳密なサニタイズが必要な場合は、DOMPurifyなどのライブラリを使用することを推奨
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
