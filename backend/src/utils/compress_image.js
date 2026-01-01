import sharp from "sharp";
import path from 'path';
async function compressImages(file, folder="images"){
  const workingDirectory= process.cwd();
  const targetdFolder = path.join(workingDirectory, "..", "..", folder);

  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9) + 467577 * Math.random()}.jpeg`;

  const targetdFolderForSaving = path.join(targetdFolder, fileName);
  await sharp(file.buffer).resize({width: 800}).jpeg({quality: 80}).toFile(targetdFolderForSaving);

  return `${process.env?.BACK_END_DOMAIN_URL}/${folder}/${fileName}`;
  
}

export default compressImages;
