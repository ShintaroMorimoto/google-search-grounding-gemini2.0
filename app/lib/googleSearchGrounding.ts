import type {
  GroundingCitation,
  GroundingSource,
} from '../types/googleSearchGrounding';

export const addCitations = (
  responseText: string,
  sources: GroundingSource[],
  citations: GroundingCitation[]
): string => {
  // 文字列の複数回置換を避けるためのマップを作成
  const replacementMap = new Map<string, string>();

  for (const citation of citations) {
    const citationText = citation.correspondingText.replace(
      /(?<=[^\s\p{P}])\s+(?=[^\s\p{P}])/gu,
      ''
    );

    if (!replacementMap.has(citationText)) {
      let links = '';

      // 重複するインデックス番号を削除
      const uniqueIndices = [...new Set(citation.referenceNumber)].sort(
        (a, b) => a - b
      );

      for (const index of uniqueIndices) {
        if (sources[index]) {
          links += `<a href="${
            sources[index].uri
          }" target="_blank" rel="noopener noreferrer" class="align-super text-xs no-underline">${
            index + 1
          }</a>`;
        }
      }

      if (links) {
        replacementMap.set(citationText, `${citationText}${links}`);
      }
    }
  }

  // 一度にすべての置換を実行
  let newResponseText = responseText;
  for (const [original, replacement] of replacementMap.entries()) {
    // 正規表現を使わず単純な文字列置換を使用
    newResponseText = newResponseText.split(original).join(replacement);
  }

  return newResponseText;
};

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

export const extractStyleContent = (responseSuggestions: string) => {
  const styleContentWithTargetBlank = responseSuggestions.replace(
    /<a /g,
    '<a target="_blank" '
  );
  const styleContentWithOnlyDarkMode = styleContentWithTargetBlank.replace(
    /@media \(prefers-color-scheme: (light)\) \{[\s\S]*?\}/g,
    ''
  );
  return styleContentWithOnlyDarkMode;
};
