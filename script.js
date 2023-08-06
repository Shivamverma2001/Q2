/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Arrays with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  const startTag = "<mark>";
  const endTag = "</mark>";
  let result = htmlContent.toLowerCase();
  const searchText = plainText.toLowerCase();

  for (const positions of plainTextPositions) {
    for (const position of positions) {
      const plainStart = position.start;
      const plainEnd = position.end;

      // Find the corresponding positions in the HTML content
      const htmlStart = result.indexOf(searchText, plainStart);
      const htmlEnd = htmlStart + plainEnd - plainStart;

      result =
        result.slice(0, htmlStart) +
        startTag +
        result.slice(htmlStart, htmlEnd) +
        endTag +
        result.slice(htmlEnd);
    }
  }

  return result;
}

// Example usage
const htmlContent = document.querySelector("p").innerHTML;
const plainText = "Energix Closes";
const plainTextPositions = [[{ start: 23, end: 37 }]];

const highlightedContent = highlightHTMLContent(
  htmlContent,
  plainText,
  plainTextPositions
);
document.querySelector("p").innerHTML = highlightedContent;
