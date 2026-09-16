import { mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const assets = [
  {
    source: 'src/assets/images/logo/oasis-logo-source.png',
    target: 'src/assets/images/logo/oasis-logo',
    width: 480,
  },
  {
    source: 'src/assets/images/dishes/seafood-platter-source.png',
    target: 'src/assets/images/dishes/seafood-platter',
    width: 1200,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/dishes/salad-platters-source.png',
    target: 'src/assets/images/dishes/salad-platters',
    width: 1200,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/dishes/grilled-fish-source.png',
    target: 'src/assets/images/dishes/grilled-fish',
    width: 1200,
  },
  {
    source: 'src/assets/images/dishes/rice-meat-source.png',
    target: 'src/assets/images/dishes/rice-meat',
    width: 720,
  },
  {
    source: 'src/assets/images/dishes/riz-soumbala-source.png',
    target: 'src/assets/images/dishes/riz-soumbala',
    width: 1200,
  },
  {
    source: 'src/assets/images/dishes/riz-soumbala-standard-source.png',
    target: 'src/assets/images/dishes/riz-soumbala-standard',
    width: 1200,
  },
  {
    source: 'src/assets/images/dishes/fish-stew-source.png',
    target: 'src/assets/images/dishes/fish-stew',
    width: 640,
  },
  {
    source: 'src/assets/images/dishes/seafood-stew-source.png',
    target: 'src/assets/images/dishes/seafood-stew',
    width: 1200,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/dishes/chicken-stew-source.png',
    target: 'src/assets/images/dishes/chicken-stew',
    width: 1200,
  },
  {
    source: 'src/assets/images/dishes/grill-selection-source.png',
    target: 'src/assets/images/dishes/grill-selection',
    width: 1200,
  },
  {
    source: 'src/assets/images/dishes/grill-action-source.png',
    target: 'src/assets/images/dishes/grill-action',
    width: 720,
  },
  {
    source: 'src/assets/images/drinks/passion-cocktail-source.png',
    target: 'src/assets/images/drinks/passion-cocktail',
    width: 1200,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/drinks/tropical-cocktail-source.png',
    target: 'src/assets/images/drinks/tropical-cocktail',
    width: 1200,
  },
  {
    source: 'src/assets/images/drinks/cocktail-duo-source.png',
    target: 'src/assets/images/drinks/cocktail-duo',
    width: 1200,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/drinks/natural-juices-source.png',
    target: 'src/assets/images/drinks/natural-juices',
    width: 1200,
  },
  {
    source: 'src/assets/images/menu/cocktails-source.png',
    target: 'src/assets/images/menu/cocktails',
    width: 1000,
    textArtwork: true,
  },
  {
    source: 'src/assets/images/menu/drinks-source.png',
    target: 'src/assets/images/menu/drinks',
    width: 1000,
    textArtwork: true,
  },
  {
    source: 'src/assets/images/menu/specialities-source.png',
    target: 'src/assets/images/menu/specialities',
    width: 1000,
    textArtwork: true,
  },
  {
    source: 'src/assets/images/menu/liqueurs-source.png',
    target: 'src/assets/images/menu/liqueurs',
    width: 1000,
    textArtwork: true,
  },
  {
    source: 'src/assets/images/menu/wines-source.png',
    target: 'src/assets/images/menu/wines',
    width: 1000,
    textArtwork: true,
  },
  {
    source: 'src/assets/images/dishes/seafood-stew-source.png',
    target: 'src/assets/images/hero/seafood-hero',
    width: 1200,
    height: 900,
    cropBottom: 0.87,
  },
  {
    source: 'src/assets/images/dishes/riz-soumbala-source.png',
    target: 'src/assets/images/hero/riz-soumbala-hero',
    width: 1200,
    height: 900,
  },
  {
    source: 'src/assets/images/drinks/tropical-cocktail-source.png',
    target: 'src/assets/images/hero/cocktail-hero',
    width: 1200,
    height: 900,
  },
  {
    source: 'src/assets/images/dishes/seafood-stew-source.png',
    target: 'src/assets/images/hero/social-preview',
    width: 1200,
    height: 630,
    cropBottom: 0.87,
  },
];

async function optimizeAsset(asset) {
  const sourcePath = resolve(projectRoot, asset.source);
  const targetPath = resolve(projectRoot, asset.target);
  const targets = [`${targetPath}.webp`, `${targetPath}.avif`];

  if (!(await needsOptimization(sourcePath, targets))) {
    return false;
  }

  await mkdir(dirname(targetPath), { recursive: true });

  const metadata = await sharp(sourcePath).metadata();
  let pipeline = sharp(sourcePath).rotate();

  if (asset.cropBottom && metadata.width && metadata.height) {
    pipeline = pipeline.extract({
      left: 0,
      top: 0,
      width: metadata.width,
      height: Math.floor(metadata.height * asset.cropBottom),
    });
  }

  pipeline = pipeline.resize({
    width: asset.width,
    height: asset.height,
    fit: asset.height ? 'cover' : 'inside',
    position: 'attention',
    withoutEnlargement: true,
  });

  const webpQuality = asset.textArtwork ? 90 : 82;
  const avifQuality = asset.textArtwork ? 72 : 58;

  await Promise.all([
    pipeline
      .clone()
      .webp({ quality: webpQuality, effort: 5 })
      .toFile(`${targetPath}.webp`),
    pipeline
      .clone()
      .avif({ quality: avifQuality, effort: 5 })
      .toFile(`${targetPath}.avif`),
  ]);

  return true;
}

async function needsOptimization(sourcePath, targetPaths) {
  const sourceStats = await stat(sourcePath);

  try {
    const targetStats = await Promise.all(targetPaths.map((path) => stat(path)));
    return targetStats.some((target) => target.mtimeMs < sourceStats.mtimeMs);
  } catch {
    return true;
  }
}

const optimizedAssets = await Promise.all(
  assets.map((asset) => optimizeAsset(asset)),
);

const logoSource = resolve(
  projectRoot,
  'src/assets/images/logo/oasis-logo-source.png',
);

const faviconPath = resolve(projectRoot, 'public/favicon-32.png');
const appleIconPath = resolve(projectRoot, 'public/apple-touch-icon.png');

if (await needsOptimization(logoSource, [faviconPath, appleIconPath])) {
  await Promise.all([
    sharp(logoSource)
      .resize(32, 32, { fit: 'contain', background: '#fffdf7' })
      .png()
      .toFile(faviconPath),
    sharp(logoSource)
      .resize(180, 180, { fit: 'contain', background: '#fffdf7' })
      .png()
      .toFile(appleIconPath),
  ]);
}

const optimizedCount = optimizedAssets.filter(Boolean).length;
console.log(
  optimizedCount > 0
    ? `Optimized ${optimizedCount} visual assets.`
    : `All ${assets.length} visual assets are up to date.`,
);
