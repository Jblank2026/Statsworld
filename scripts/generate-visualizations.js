const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// UTK Colors
const UTK_ORANGE = '#ff8200';
const UTK_SMOKEY = '#58595b';

// Helper function to create SVG
function createSVG(width, height, content) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  ${content}
</svg>`;
}

// 1. Scatterplot
const scatterplot = createSVG(800, 500, `
  <!-- Grid -->
  ${Array.from({ length: 10 }, (_, i) => `
    <line x1="50" y1="${50 + i * 40}" x2="750" y2="${50 + i * 40}" 
          stroke="#eee" stroke-width="1"/>
    <line x1="${50 + i * 70}" y1="50" x2="${50 + i * 70}" y2="450" 
          stroke="#eee" stroke-width="1"/>
  `).join('')}
  
  <!-- Axes -->
  <line x1="50" y1="450" x2="750" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Points -->
  ${Array.from({ length: 50 }, () => {
    const x = Math.random() * 700 + 50;
    const y = 450 - (Math.random() * 400);
    return `<circle cx="${x}" cy="${y}" r="5" fill="${UTK_ORANGE}" opacity="0.6"/>`;
  }).join('')}
  
  <!-- Labels -->
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="14">Variable X (Continuous)</text>
  <text x="20" y="250" text-anchor="middle" transform="rotate(-90, 20, 250)" 
        font-family="Arial" font-size="14">Variable Y (Continuous)</text>
`);

// 2. Histogram
const histogram = createSVG(800, 500, `
  <!-- Grid -->
  ${Array.from({ length: 10 }, (_, i) => `
    <line x1="50" y1="${50 + i * 40}" x2="750" y2="${50 + i * 40}" 
          stroke="#eee" stroke-width="1"/>
  `).join('')}
  
  <!-- Axes -->
  <line x1="50" y1="450" x2="750" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Bars -->
  ${Array.from({ length: 10 }, (_, i) => {
    const height = Math.random() * 300 + 50;
    return `<rect x="${80 + i * 70}" y="${450 - height}" width="50" height="${height}" 
                  fill="${UTK_ORANGE}" opacity="0.7" stroke="${UTK_SMOKEY}"/>`;
  }).join('')}
  
  <!-- Labels -->
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="14">Values</text>
  <text x="20" y="250" text-anchor="middle" transform="rotate(-90, 20, 250)" 
        font-family="Arial" font-size="14">Frequency</text>
`);

// 3. Bar Chart (Univariate only)
const barChart = createSVG(800, 500, `
  <!-- Grid -->
  ${Array.from({ length: 10 }, (_, i) => `
    <line x1="50" y1="${50 + i * 40}" x2="750" y2="${50 + i * 40}" 
          stroke="#eee" stroke-width="1"/>
  `).join('')}
  
  <!-- Axes -->
  <line x1="50" y1="450" x2="750" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Single Bars -->
  ${Array.from({ length: 6 }, (_, i) => {
    const height = Math.random() * 300 + 50;
    return `
      <rect x="${100 + i * 110}" y="${450 - height}" width="80" height="${height}" 
            fill="${UTK_ORANGE}" stroke="${UTK_SMOKEY}"/>
      <text x="${140 + i * 110}" y="470" text-anchor="middle" font-family="Arial" font-size="14">
        Category ${String.fromCharCode(65 + i)}
      </text>
    `;
  }).join('')}
  
  <!-- Labels -->
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="14">Categories</text>
  <text x="20" y="250" text-anchor="middle" transform="rotate(-90, 20, 250)" 
        font-family="Arial" font-size="14">Frequency</text>
`);

// 4. Frequency Table
const frequencyTable = createSVG(800, 500, `
  <!-- Table Background -->
  <rect x="100" y="100" width="600" height="300" fill="white" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Header Row -->
  <rect x="100" y="100" width="600" height="50" fill="${UTK_ORANGE}" opacity="0.1"/>
  <text x="200" y="130" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Category</text>
  <text x="400" y="130" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Frequency</text>
  <text x="600" y="130" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Percentage</text>
  
  <!-- Data Rows -->
  ${Array.from({ length: 5 }, (_, i) => {
    const frequency = Math.floor(Math.random() * 50) + 10;
    const percentage = Math.round(frequency / 150 * 100);
    return `
      <text x="200" y="${180 + i * 40}" text-anchor="middle" font-family="Arial" font-size="14">Category ${String.fromCharCode(65 + i)}</text>
      <text x="400" y="${180 + i * 40}" text-anchor="middle" font-family="Arial" font-size="14">${frequency}</text>
      <text x="600" y="${180 + i * 40}" text-anchor="middle" font-family="Arial" font-size="14">${percentage}%</text>
    `;
  }).join('')}
`);

// 5. Mosaic Plot
const mosaicPlot = createSVG(800, 500, `
  <!-- Background -->
  <rect x="50" y="50" width="700" height="400" fill="white" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Vertical Sections -->
  ${Array.from({ length: 3 }, (_, i) => {
    const width = Math.random() * 150 + 100;
    return `
      <rect x="${50 + i * width}" y="50" width="${width}" height="400" 
            fill="${UTK_ORANGE}" opacity="${0.3 + i * 0.2}" stroke="${UTK_SMOKEY}"/>
      <text x="${50 + i * width + width/2}" y="470" text-anchor="middle" font-family="Arial" font-size="14">
        Category ${String.fromCharCode(65 + i)}
      </text>
    `;
  }).join('')}
  
  <!-- Horizontal Sections -->
  ${Array.from({ length: 2 }, (_, i) => {
    const height = Math.random() * 150 + 100;
    return `
      <line x1="50" y1="${50 + height}" x2="750" y2="${50 + height}" 
            stroke="${UTK_SMOKEY}" stroke-width="1"/>
      <text x="20" y="${50 + height}" text-anchor="end" font-family="Arial" font-size="14">
        Group ${i + 1}
      </text>
    `;
  }).join('')}
`);

// 6. Box Plot
const boxPlot = createSVG(800, 500, `
  <!-- Grid -->
  ${Array.from({ length: 10 }, (_, i) => `
    <line x1="50" y1="${50 + i * 40}" x2="750" y2="${50 + i * 40}" 
          stroke="#eee" stroke-width="1"/>
  `).join('')}
  
  <!-- Axes -->
  <line x1="50" y1="450" x2="750" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Box Plots -->
  ${Array.from({ length: 3 }, (_, groupIndex) => {
    return Array.from({ length: 2 }, (_, i) => {
      const median = 250 - Math.random() * 100;
      const q1 = median - Math.random() * 50;
      const q3 = median + Math.random() * 50;
      const min = q1 - Math.random() * 30;
      const max = q3 + Math.random() * 30;
      const x = 150 + groupIndex * 250 + i * 60;
      
      return `
        <!-- Box -->
        <rect x="${x - 20}" y="${q1}" width="40" height="${q3 - q1}" 
              fill="${UTK_ORANGE}" opacity="${0.6 + i * 0.2}" stroke="${UTK_SMOKEY}"/>
        
        <!-- Median -->
        <line x1="${x - 20}" y1="${median}" x2="${x + 20}" y2="${median}" 
              stroke="${UTK_SMOKEY}" stroke-width="2"/>
        
        <!-- Whiskers -->
        <line x1="${x}" y1="${min}" x2="${x}" y2="${q1}" stroke="${UTK_SMOKEY}" stroke-width="1"/>
        <line x1="${x}" y1="${q3}" x2="${x}" y2="${max}" stroke="${UTK_SMOKEY}" stroke-width="1"/>
        <line x1="${x - 10}" y1="${min}" x2="${x + 10}" y2="${min}" stroke="${UTK_SMOKEY}" stroke-width="1"/>
        <line x1="${x - 10}" y1="${max}" x2="${x + 10}" y2="${max}" stroke="${UTK_SMOKEY}" stroke-width="1"/>
      `;
    }).join('');
  }).join('')}
  
  <!-- Group Labels -->
  ${Array.from({ length: 3 }, (_, i) => `
    <text x="${150 + i * 250}" y="480" text-anchor="middle" font-family="Arial" font-size="14">Group ${i + 1}</text>
  `).join('')}
  
  <!-- Category Labels -->
  <text x="20" y="250" text-anchor="middle" transform="rotate(-90, 20, 250)" 
        font-family="Arial" font-size="14">Values</text>
`);

// 7. Pie Chart
const pieChart = createSVG(800, 500, `
  <!-- Pie Chart -->
  ${(() => {
    let total = 0;
    const values = Array.from({ length: 5 }, () => Math.random() * 30 + 10);
    total = values.reduce((a, b) => a + b, 0);
    
    let startAngle = 0;
    return values.map((value, i) => {
      const percentage = value / total;
      const angle = percentage * Math.PI * 2;
      const endAngle = startAngle + angle;
      
      const startX = 400 + Math.cos(startAngle) * 150;
      const startY = 250 + Math.sin(startAngle) * 150;
      const endX = 400 + Math.cos(endAngle) * 150;
      const endY = 250 + Math.sin(endAngle) * 150;
      
      const largeArcFlag = percentage > 0.5 ? 1 : 0;
      
      const labelAngle = startAngle + angle / 2;
      const labelX = 400 + Math.cos(labelAngle) * 180;
      const labelY = 250 + Math.sin(labelAngle) * 180;
      
      const path = `
        <path d="M 400 250
          L ${startX} ${startY}
          A 150 150 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z"
          fill="${UTK_ORANGE}"
          opacity="${0.4 + i * 0.1}"
          stroke="${UTK_SMOKEY}"
          stroke-width="2"
        />
        <text x="${labelX}" y="${labelY}" text-anchor="middle" font-family="Arial" font-size="14">
          ${Math.round(percentage * 100)}%
        </text>
      `;
      
      startAngle = endAngle;
      return path;
    }).join('');
  })()}
`);

// 8. Dot Plot
const dotPlot = createSVG(800, 500, `
  <!-- Grid -->
  ${Array.from({ length: 10 }, (_, i) => `
    <line x1="50" y1="${50 + i * 40}" x2="750" y2="${50 + i * 40}" 
          stroke="#eee" stroke-width="1"/>
  `).join('')}
  
  <!-- Axes -->
  <line x1="50" y1="450" x2="750" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="450" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Dots -->
  ${Array.from({ length: 10 }, (_, i) => {
    const count = Math.floor(Math.random() * 8) + 1;
    return Array.from({ length: count }, (_, j) => `
      <circle cx="${100 + i * 70}" cy="${450 - (j * 30)}" r="5" 
              fill="${UTK_ORANGE}" stroke="${UTK_SMOKEY}"/>
    `).join('');
  }).join('')}
  
  <!-- Labels -->
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="14">Values</text>
  <text x="20" y="250" text-anchor="middle" transform="rotate(-90, 20, 250)" 
        font-family="Arial" font-size="14">Count</text>
`);

// 9. Stem-and-Leaf Plot
const stemAndLeafPlot = createSVG(800, 500, `
  <!-- Background -->
  <rect x="100" y="100" width="600" height="300" fill="white" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Data -->
  ${Array.from({ length: 6 }, (_, i) => {
    const stem = i + 2;
    const leaves = Array.from({ length: Math.floor(Math.random() * 6) + 1 }, 
      () => Math.floor(Math.random() * 10));
    return `
      <text x="350" y="${150 + i * 40}" text-anchor="end" font-family="monospace" font-size="16">
        ${stem} |
      </text>
      <text x="370" y="${150 + i * 40}" font-family="monospace" font-size="16">
        ${leaves.sort().join(' ')}
      </text>
    `;
  }).join('')}
  
  <text x="400" y="400" text-anchor="middle" font-family="Arial" font-size="14">
    Key: 2|1 = 21
  </text>
`);

// Add contingency table
const contingencyTable = createSVG(800, 500, `
  <!-- Table Background -->
  <rect x="100" y="100" width="600" height="300" fill="white" stroke="${UTK_SMOKEY}" stroke-width="2"/>
  
  <!-- Header Row -->
  <rect x="100" y="100" width="600" height="50" fill="${UTK_ORANGE}" opacity="0.1"/>
  <rect x="100" y="100" width="150" height="50" fill="${UTK_ORANGE}" opacity="0.1"/>
  
  <!-- Column Headers -->
  <text x="175" y="130" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Category</text>
  ${Array.from({ length: 3 }, (_, i) => `
    <text x="${325 + i * 150}" y="130" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">
      Group ${String.fromCharCode(65 + i)}
    </text>
  `).join('')}
  
  <!-- Data Rows -->
  ${Array.from({ length: 4 }, (_, i) => {
    const rowValues = Array.from({ length: 3 }, () => Math.floor(Math.random() * 50) + 10);
    return `
      <text x="175" y="${180 + i * 40}" text-anchor="middle" font-family="Arial" font-size="14">
        Type ${i + 1}
      </text>
      ${rowValues.map((value, j) => `
        <text x="${325 + j * 150}" y="${180 + i * 40}" text-anchor="middle" font-family="Arial" font-size="14">
          ${value}
        </text>
      `).join('')}
    `;
  }).join('')}
  
  <!-- Row Totals -->
  <rect x="100" y="260" width="600" height="40" fill="${UTK_ORANGE}" opacity="0.1"/>
  <text x="175" y="285" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Total</text>
  ${(() => {
    const columnTotals = Array.from({ length: 3 }, (_, i) => 
      Array.from({ length: 4 }, (_, j) => Math.floor(Math.random() * 50) + 10)
        .reduce((a, b) => a + b, 0)
    );
    return columnTotals.map((total, i) => `
      <text x="${325 + i * 150}" y="285" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">
        ${total}
      </text>
    `).join('');
  })()}
`);

// Save all SVGs
fs.writeFileSync(path.join(imagesDir, 'viz-1.svg'), scatterplot);
fs.writeFileSync(path.join(imagesDir, 'viz-2.svg'), histogram);
fs.writeFileSync(path.join(imagesDir, 'viz-3.svg'), barChart);
fs.writeFileSync(path.join(imagesDir, 'viz-4.svg'), frequencyTable);
fs.writeFileSync(path.join(imagesDir, 'viz-5.svg'), mosaicPlot);
fs.writeFileSync(path.join(imagesDir, 'viz-6.svg'), boxPlot);
fs.writeFileSync(path.join(imagesDir, 'viz-7.svg'), pieChart);
fs.writeFileSync(path.join(imagesDir, 'viz-8.svg'), dotPlot);
fs.writeFileSync(path.join(imagesDir, 'viz-9.svg'), stemAndLeafPlot);
fs.writeFileSync(path.join(imagesDir, 'viz-10.svg'), contingencyTable);

console.log('Visualizations generated successfully!'); 