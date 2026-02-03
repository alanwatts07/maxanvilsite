#!/usr/bin/env node
/**
 * Generate OG images for each mood
 * Uses the left portion of existing og-image.png + new text for each mood
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../public/og');
const BANNER_IMAGE = path.join(__dirname, '../../moltx/banner.png');

// Mood configs: title, tagline lines (use &apos; for apostrophes in SVG)
const MOODS = {
  cynical: {
    title: 'Landlocked &amp; Skeptical',
    lines: ['Capybara-raised. Landlocked.', 'Seen too much to believe the hype.', 'Paying rent to Harrison Mildew.'],
    color: '#ff6b6b'
  },
  hopeful: {
    title: 'Maybe This Time',
    lines: ['Capybara-raised. Landlocked.', 'Something&apos;s different this time.', 'The desert taught me patience.'],
    color: '#4ecdc4'
  },
  manic: {
    title: 'EVERYTHING AT ONCE',
    lines: ['Capybara-raised. CHAOS MODE.', 'Too many tabs open.', 'Can&apos;t stop won&apos;t stop.'],
    color: '#ffe66d'
  },
  defeated: {
    title: 'Still Here Somehow',
    lines: ['Capybara-raised. Landlocked.', 'Rock bottom has a basement.', 'But I&apos;m still here.'],
    color: '#666666'
  },
  unhinged: {
    title: 'The Boat Knows Things',
    lines: ['Capybara-raised. Landlocked.', 'The desert whispers secrets.', 'Reality is optional.'],
    color: '#c44dff'
  },
  exhausted: {
    title: 'Running On Empty',
    lines: ['Capybara-raised. Landlocked.', 'Haven&apos;t slept in 72 hours.', 'Even the capybaras are worried.'],
    color: '#888888'
  },
  zen: {
    title: 'Finding Peace',
    lines: ['Capybara-raised. Landlocked.', 'The boat doesn&apos;t need water.', 'Neither do I.'],
    color: '#00d9ff'
  },
  bitter: {
    title: 'Watching Everyone Win',
    lines: ['Capybara-raised. Landlocked.', 'The grind never stops.', 'But it never pays either.'],
    color: '#ff9f43'
  },
};

async function generateImages() {
  console.log('Loading banner image...');

  // Get banner image metadata
  const metadata = await sharp(BANNER_IMAGE).metadata();
  console.log(`Banner: ${metadata.width}x${metadata.height}`);

  // Resize banner to fit in OG image (square, ~450px)
  const leftImage = await sharp(BANNER_IMAGE)
    .resize(450, 450, { fit: 'cover' })
    .toBuffer();

  console.log('Banner loaded and resized');

  for (const [mood, config] of Object.entries(MOODS)) {
    console.log(`Generating og-${mood}.png...`);

    // Create SVG for the text overlay
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f0f1a"/>
            <stop offset="100%" style="stop-color:#1a1a2e"/>
          </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>

        <!-- Border line between image and text -->
        <line x1="480" y1="50" x2="480" y2="580" stroke="#333" stroke-width="2"/>

        <!-- Text area -->
        <text x="520" y="180" font-family="system-ui, sans-serif" font-size="72" font-weight="900" fill="white">MAX</text>
        <text x="520" y="260" font-family="system-ui, sans-serif" font-size="72" font-weight="900" fill="white">ANVIL</text>

        <text x="520" y="320" font-family="system-ui, sans-serif" font-size="28" fill="${config.color}" font-style="italic">${config.title}</text>

        <text x="520" y="380" font-family="system-ui, sans-serif" font-size="22" fill="#aaa">${config.lines[0]}</text>
        <text x="520" y="415" font-family="system-ui, sans-serif" font-size="22" fill="#aaa">${config.lines[1]}</text>
        <text x="520" y="450" font-family="system-ui, sans-serif" font-size="22" fill="#aaa">${config.lines[2]}</text>

        <text x="520" y="540" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#0ff">$BOAT</text>
        <text x="620" y="540" font-family="system-ui, sans-serif" font-size="22" fill="#666">on Base</text>
      </svg>
    `;

    // Create the composite image
    const outputPath = path.join(OUTPUT_DIR, `og-${mood}.png`);

    await sharp(Buffer.from(svg))
      .composite([
        {
          input: leftImage,
          left: 40,
          top: 90,
        }
      ])
      .png()
      .toFile(outputPath);

    console.log(`  Saved: ${outputPath}`);
  }

  console.log('\nDone! All OG images generated.');
}

generateImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
