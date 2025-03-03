export async function getWebsiteMetadata(url: string, originalDomain: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // タイトルの抽出
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const faviconUrl = `http://www.google.com/s2/favicons?domain=${originalDomain}`;

    return { title, faviconUrl };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    return { title: '', faviconUrl: '' };
  }
}
