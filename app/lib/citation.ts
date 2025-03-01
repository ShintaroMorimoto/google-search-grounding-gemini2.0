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
    const citationText = citation.correspondingText;

    for (const index of citationNumber) {
      if (sources[index]) {
        const uri = sources[index].uri;
        const link = `<a href="${uri}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">[${
          index + 1
        }]</a>`;
        newParsedMessage = newParsedMessage.replace(
          citationText,
          `${citationText}${link}`
        );
      }
    }
  }
  return newParsedMessage;
};
