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
