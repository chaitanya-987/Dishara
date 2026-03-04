// Script to generate PNG icons from SVG using Canvas API
// Run this once in a browser console or Node.js with canvas

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svgTemplate = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b35"/>
      <stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg)"/>
  <text x="256" y="320" font-size="260" text-anchor="middle" font-family="Arial">🍽️</text>
  <text x="256" y="460" font-size="80" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">D</text>
</svg>`;

console.log('SVG icon template ready for sizes:', sizes);
module.exports = { sizes, svgTemplate };
