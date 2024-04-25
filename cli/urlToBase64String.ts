export const urlToBase64String = async (url): Promise<string> => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
};
