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
