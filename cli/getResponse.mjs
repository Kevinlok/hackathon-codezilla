export const getResponse = async (url, responseMethod = 'json') => {
  const response = await fetch(url);
  return response[responseMethod]();
};
