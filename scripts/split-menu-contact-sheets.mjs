import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const sheets = [
  {
    source: 'src/assets/images/menu-sources/cocktails-juices-grid.png',
    columns: 4,
    rows: 4,
    outputDir: 'src/assets/images/menu-items',
    ids: [
      'mojito-nature', 'mojito-passion', 'mojito-fraise', 'cocktail-fruits-saison',
      'cocktail-monaco', 'cocktail-bleu-lagons', 'cocktail-gins-tonic', 'cocktail-menthe-alcoolise',
      'cocktail-yama-toutou', 'jus-passion', 'jus-multifruits', 'jus-bissap',
      'jus-gingembre', 'jus-tomi', 'jus-citron',
    ],
  },
  {
    source: 'src/assets/images/menu-sources/beers-softs-grid.png',
    columns: 5,
    rows: 4,
    outputDir: 'src/assets/images/menu-items',
    ids: [
      'biere-beaufort', 'biere-bock-66', 'biere-booster-tequila', 'biere-chill-50', 'biere-guinness-50',
      'biere-guinness-30', 'biere-ivoire-60', 'biere-desperados', 'biere-heineken', 'biere-budweiser',
      'eau-awa', 'eau-olgane', 'eau-celeste', 'eau-cristaline', 'soft-bavaria',
      'soft-malta', 'soft-codys', 'soft-sucrerie-60', 'soft-sucrerie-33', 'soft-pinho-doppel',
    ],
  },
  {
    source: 'src/assets/images/menu-sources/liqueurs-grid.png',
    columns: 5,
    rows: 5,
    outputDir: 'src/assets/images/menu-items',
    ids: [
      'liqueur-jb', 'liqueur-jack-daniels', 'liqueur-gordons', 'liqueur-campari', 'liqueur-red-label',
      'liqueur-black-label', 'liqueur-saint-james', 'liqueur-mangoustan', 'liqueur-martini', 'liqueur-ballantines',
      'liqueur-sir-edwards', 'liqueur-vodka', 'liqueur-baileys', 'liqueur-boom-boom', 'liqueur-whisky-peche',
      'saveur-passion', 'saveur-cannelle', 'saveur-citron', 'saveur-clementine', 'saveur-ananas',
      'saveur-gingembre', 'saveur-clous-girofle', 'saveur-poivre-long-gingembre', 'saveurs-bouteille',
    ],
  },
  {
    source: 'src/assets/images/menu-sources/hot-wines-grid.png',
    columns: 5,
    rows: 4,
    outputDir: 'src/assets/images/menu-items',
    ids: [
      'chaud-nescafe', 'chaud-nespresso', 'chaud-the', 'chaud-miel-citron', 'chaud-gingembre',
      'vin-chambery', 'vin-baron-dardignac', 'vin-louis-eschenauer', 'vin-cuvee', 'vin-alexio-garcia',
      'vin-grand-versant', 'vin-rlg', 'vin-carillonade-blanc', 'vin-carillonade-bordeaux', 'vin-carillonade-merlot',
      'vin-carillonade-blanc-moelleux', 'vin-up-chenet', 'vin-chenet-ice', 'vin-grand-versant-blanc',
    ],
  },
];

for (const sheet of sheets) {
  const source = resolve(root, sheet.source);
  const metadata = await sharp(source).metadata();
  const tileWidth = Math.floor(metadata.width / sheet.columns);
  const tileHeight = Math.floor(metadata.height / sheet.rows);
  const outputDir = resolve(root, sheet.outputDir);
  await mkdir(outputDir, { recursive: true });

  for (const [index, id] of sheet.ids.entries()) {
    const left = (index % sheet.columns) * tileWidth;
    const top = Math.floor(index / sheet.columns) * tileHeight;
    const image = sharp(source)
      .extract({ left, top, width: tileWidth, height: tileHeight })
      .resize(720, 720, { fit: 'cover' });
    await image.clone().webp({ quality: 82 }).toFile(resolve(outputDir, `${id}.webp`));
    await image.clone().avif({ quality: 55 }).toFile(resolve(outputDir, `${id}.avif`));
  }
}

const hunterSoup = sharp(resolve(root, 'src/assets/images/dishes/hunter-soup-source.png'))
  .resize(720, 960, { fit: 'cover' });
await hunterSoup.clone().webp({ quality: 82 }).toFile(resolve(root, 'src/assets/images/dishes/hunter-soup.webp'));
await hunterSoup.clone().avif({ quality: 55 }).toFile(resolve(root, 'src/assets/images/dishes/hunter-soup.avif'));

const sheepSoup = sharp(resolve(root, 'src/assets/images/dishes/sheep-soup-source.png'))
  .resize(720, 960, { fit: 'cover' });
await sheepSoup.clone().webp({ quality: 82 }).toFile(resolve(root, 'src/assets/images/dishes/sheep-soup.webp'));
await sheepSoup.clone().avif({ quality: 55 }).toFile(resolve(root, 'src/assets/images/dishes/sheep-soup.avif'));

console.log('Created unique menu images.');
