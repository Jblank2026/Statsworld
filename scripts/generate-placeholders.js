const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Function to create an SVG placeholder
function createPlaceholderSVG(width, height, text, bgColor = '#58595b', textColor = '#ffffff') {
  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
</svg>
`;
}

// Generate Smokey mascot placeholder
const smokeySvg = createPlaceholderSVG(800, 600, 'Smokey with Data Visualization', '#58595b', '#ff8200');
fs.writeFileSync(
  path.join(imagesDir, 'smokey-stats.jpg'),
  Buffer.from(smokeySvg)
);

// Generate chapter images
const chapters = [
  'Introduction to Regression',
  'Exploring Associations',
  'Simple Linear Regression',
  'Multiple Regression',
  'Categorical Variables',
  'Logistic Regression',
  'Building Models',
  'Predictive Modeling',
  'Partition Models'
];

chapters.forEach((chapter, index) => {
  const svg = createPlaceholderSVG(800, 600, `Chapter ${index + 1}:\n${chapter}`, '#58595b', '#ff8200');
  fs.writeFileSync(
    path.join(imagesDir, `chapter-${index + 1}.jpg`),
    Buffer.from(svg)
  );
});

// Generate game thumbnails
const games = [
  'Data Detective',
  'Regression Race',
  'Chart It Right',
  'Logistic Explorer',
  'Analytics Escape Room'
];

games.forEach((game, index) => {
  const svg = createPlaceholderSVG(400, 300, game, '#ff8200', '#ffffff');
  fs.writeFileSync(
    path.join(imagesDir, `game-${index + 1}.jpg`),
    Buffer.from(svg)
  );
});

// Generate resource thumbnails
const resources = [
  'Chapter Notes',
  'Practice Problems',
  'Video Tutorials',
  'Datasets'
];

resources.forEach((resource, index) => {
  const svg = createPlaceholderSVG(400, 300, resource, '#e65933', '#ffffff');
  fs.writeFileSync(
    path.join(imagesDir, `resource-${index + 1}.jpg`),
    Buffer.from(svg)
  );
});

// Generate UTK-themed decorative elements
const decorative = [
  { name: 'checkerboard', text: 'UTK Pattern', color: '#ff8200' },
  { name: 'wave', text: 'UTK Wave', color: '#58595b' },
  { name: 'dots', text: 'UTK Dots', color: '#e65933' }
];

decorative.forEach((element) => {
  const svg = createPlaceholderSVG(200, 200, element.text, element.color);
  fs.writeFileSync(
    path.join(imagesDir, `decorative-${element.name}.jpg`),
    Buffer.from(svg)
  );
});

console.log('UTK-themed placeholder images generated successfully!'); 