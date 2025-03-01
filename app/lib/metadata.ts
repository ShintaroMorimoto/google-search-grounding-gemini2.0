export async function getWebsiteMetadata(url: string, originalDomain: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // タイトルの抽出
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // ファビコンの抽出
    let faviconUrl = '';
    const faviconMatch = html.match(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["'][^>]*>/i
    );

    // オリジナルドメインを使用してファビコンURLを構築
    const baseUrl = `https://${originalDomain}`;
    if (faviconMatch) {
      faviconUrl = new URL(faviconMatch[1], baseUrl).href;
    } else {
      faviconUrl = new URL('/favicon.ico', baseUrl).href;
    }

    return { title, faviconUrl };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    return { title: '', faviconUrl: '' };
  }
}
