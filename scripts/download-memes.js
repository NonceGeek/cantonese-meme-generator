const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/cat.jpg',
    filename: 'cat.jpg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/2962797699.jpeg',
    filename: 'stars.jpeg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/4005474878.jpeg',
    filename: 'talking.jpeg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/3416421815.jpeg',
    filename: 'shrimp.jpeg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/%5B%E7%A5%9E%E5%A5%87%E6%B5%B7%E8%9E%BA%5D%5B%E6%A2%97%E5%9B%BE%E7%94%9F%E6%88%90%E5%99%A8%5D-1751182495191.jpg',
    filename: 'eat.jpg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/throw.jpg',
    filename: 'throw.jpg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/%5B%E7%A5%9E%E5%A5%87%E6%B5%B7%E8%9E%BA%5D%5B%E6%A2%97%E5%9B%BE%E7%94%9F%E6%88%90%E5%99%A8%5D-1751189204356.jpg',
    filename: 'what1.jpg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/bird.jpg',
    filename: 'bird.jpg'
  },
  {
    url: 'https://dimsum-meme.oss-cn-guangzhou.aliyuncs.com/girl2.jpg',
    filename: 'girl2.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const targetPath = path.join(__dirname, './packages/nextjs/public/meme-templates', filename);
    
    // Skip if file already exists
    if (fs.existsSync(targetPath)) {
      console.log(`Skipping ${filename} - already exists`);
      resolve();
      return;
    }

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(targetPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(targetPath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', reject);
  });
};

async function downloadAll() {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(__dirname, '../public/meme-templates');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Download all images
    await Promise.all(images.map(img => downloadImage(img.url, img.filename)));
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

downloadAll(); 