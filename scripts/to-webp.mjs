import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [inputDir = "photos-originales", outputDir = "public/images/hero"] = process.argv.slice(2);
const WIDTH = 1200;
const HEIGHT = 1500;
const MAX_KB = 200;

await mkdir(outputDir, { recursive: true });
const files = (await readdir(inputDir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

if (files.length === 0) {
  console.log(`Aucune image trouvee dans ${inputDir}`);
  process.exit(1);
}

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/^hero[-_ ]?(\d+)$/, "hero-$1");
  const out = path.join(outputDir, `${name}.webp`);
  let quality = 82;
  let buffer;

  do {
    buffer = await sharp(path.join(inputDir, file))
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .webp({ quality })
      .toBuffer();
    quality -= 6;
  } while (buffer.length > MAX_KB * 1024 && quality >= 40);

  await writeFile(out, buffer);
  console.log(`${file} -> ${out} (${Math.round(buffer.length / 1024)} Ko)`);
}