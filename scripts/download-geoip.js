// scripts/download-geoip.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const tar = require('tar');

// Load .env files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const licenseKey = process.env.MAXMIND_LICENSE_KEY;

const committedMmdb = path.join(process.cwd(), 'GeoLite2-City.mmdb');
const dataDir = path.join(process.cwd(), 'node_modules', 'geoip-lite', 'data');
const mmdbPath = path.join(dataDir, 'GeoLite2-City.mmdb');

console.log('📥 Checking GeoLite2 City database...');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// === PRIORITY 1: Use committed file (this fixes Vercel 429) ===
if (fs.existsSync(committedMmdb)) {
  try {
    fs.copyFileSync(committedMmdb, mmdbPath);
    console.log('✅ Copied committed GeoLite2-City.mmdb from project root (no download needed)');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to copy committed database:', err.message);
  }
}

// === FALLBACK: Download only when no committed file exists ===
if (!licenseKey) {
  console.error('❌ MAXMIND_LICENSE_KEY is missing in .env or .env.local');
  process.exit(1);
}

console.log('📦 No committed database found → downloading...');

const downloadUrl = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${licenseKey}&suffix=tar.gz`;
const tarPath = path.join(process.cwd(), 'GeoLite2-City.tar.gz');

https.get(downloadUrl, (res) => {
  if (res.statusCode === 302 || res.statusCode === 301) {
    console.log('🔄 Following redirect...');
    https.get(res.headers.location, handleResponse);
    return;
  }
  handleResponse(res);
});

function handleResponse(res) {
  if (res.statusCode !== 200) {
    console.error('❌ Download failed with status:', res.statusCode);
    if (res.statusCode === 429) {
      console.error('💡 MaxMind rate limited you. Commit the .mmdb file to avoid this forever!');
    }
    process.exit(1);
  }

  const file = fs.createWriteStream(tarPath);
  res.pipe(file);
  file.on('finish', async () => {
    file.close();
    console.log('✅ Download complete. Extracting...');
    try {
      await tar.extract({
        file: tarPath,
        cwd: dataDir,
        strip: 1,
        filter: (filePath) => filePath.endsWith('.mmdb')
      });
      fs.unlinkSync(tarPath);

      // Save a copy to root so future Vercel builds don’t need to download
      fs.copyFileSync(mmdbPath, committedMmdb);
      console.log('✅ GeoLite2-City.mmdb installed/updated and saved to project root! 🎉');
      process.exit(0);
    } catch (err) {
      console.error('❌ Extraction failed:', err.message);
      process.exit(1);
    }
  });
}