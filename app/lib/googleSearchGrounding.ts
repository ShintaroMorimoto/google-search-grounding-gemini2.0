import type {
  GroundingCitation,
  GroundingSource,
} from '../types/googleSearchGrounding';

export const addCitations = (
  parsedMessage: string,
  sources: GroundingSource[],
  citations: GroundingCitation[]
): string => {
  let newParsedMessage = parsedMessage;

  for (const citation of citations) {
    const citationNumber = citation.referenceNumber;
    const citationText = citation.correspondingText.replace(
      /(?<=[^\s\p{P}])\s+(?=[^\s\p{P}])/gu,
      ''
    );

    const indices = citationNumber.sort((a, b) => b - a);

    for (const index of indices) {
      if (sources[index]) {
        const uri = sources[index].uri;
        const link = `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="align-super text-xs no-underline">${
          index + 1
        }</a>`;
        newParsedMessage = newParsedMessage.replace(
          citationText,
          `${citationText}${link}`
        );
      }
    }
  }
  return newParsedMessage;
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
