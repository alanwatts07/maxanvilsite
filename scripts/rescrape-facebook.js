#!/usr/bin/env node
/**
 * Force Facebook to rescrape the OG tags
 * Run after deploy: node scripts/rescrape-facebook.js
 *
 * Requires: FACEBOOK_ACCESS_TOKEN env var
 * Get one at: https://developers.facebook.com/tools/explorer/
 * Or use App Token: APP_ID|APP_SECRET
 */

const SITE_URL = 'https://maxanvil.com';
const DELAY_SECONDS = 30;

async function rescrape() {
  const token = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!token) {
    console.error('Error: FACEBOOK_ACCESS_TOKEN environment variable not set');
    console.log('\nTo get a token:');
    console.log('1. Go to https://developers.facebook.com/tools/explorer/');
    console.log('2. Select your app and generate a token');
    console.log('3. Or use App Token format: APP_ID|APP_SECRET');
    console.log('\nThen run: FACEBOOK_ACCESS_TOKEN=your_token node scripts/rescrape-facebook.js');
    process.exit(1);
  }

  console.log(`Waiting ${DELAY_SECONDS} seconds for deploy to propagate...`);
  await new Promise(r => setTimeout(r, DELAY_SECONDS * 1000));

  console.log(`Requesting Facebook rescrape for ${SITE_URL}...`);

  try {
    const url = `https://graph.facebook.com/v19.0/?id=${encodeURIComponent(SITE_URL)}&scrape=true&access_token=${token}`;

    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();

    if (data.error) {
      console.error('Facebook API error:', data.error.message);
      process.exit(1);
    }

    console.log('Rescrape successful!');
    console.log('Title:', data.title);
    console.log('Description:', data.description);
    console.log('Image:', data.image?.[0]?.url || 'none');
    console.log('\nFacebook will now show the updated OG tags.');
  } catch (err) {
    console.error('Request failed:', err.message);
    process.exit(1);
  }
}

rescrape();
