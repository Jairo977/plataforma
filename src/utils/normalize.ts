export const cleanText = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡]/g, "") // Remove punctuation
    .trim()
    .split(/\s+/) // Split by spaces
    .filter(Boolean); // Remove any empty strings just in case
};
