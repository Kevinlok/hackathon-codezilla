const sharp = require('sharp');

export const urlToBase64String = async (url): Promise<string> => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const img = Buffer.from(buffer).toString('base64');
  console.log(img);
  const test = new Buffer(img, 'base64');
  return sharp(test).resize(500).toBuffer().then((data) => {
    return data.toString('base64');
  });
};
