process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { scanToken } from './services/tokenScanner';

async function runV1LaunchSuite() {
  console.log('=== V1 LAUNCH SCANNER TEST SUITE ===\n');

  const tokens = [
    { name: 'Robinhood', address: '0x008df4b3e857d06c4603aeb11f267ccd32ce2005' },
    { name: 'Cash Cat', address: '0x020bfc650a365f8bb26819deaabf3e21291018b4' },
    { name: 'Stock Royale', address: '0x865b979286dcc32488513f142fe7da22afcaeeeb' },
    { name: 'Hooked Bitcoin', address: '0x8db244f6bf052571f4e0c6065b700e714092d4b6' },
    { name: 'QUOTRON', address: '0xf05bcf94c8c020e43de8927b491c6be8b96777e3' }
  ];

  const results = [];

  for (const t of tokens) {
    console.log(`--------------------------------------------------`);
    console.log(`Scanning [${t.name}]: ${t.address}`);
    try {
      const res = await scanToken(t.address);
      results.push({
        TOKEN: `${res.tokenName} (${t.address.slice(0, 6)}...${t.address.slice(-4)})`,
        TOP10: res.holderConcentration.value,
        DEV: res.devWalletActivity.value,
        VOLUME: res.volumeBehavior.value,
        SCORE: res.failureScore,
      });
      console.log(`✅ [${t.name}] Failure Score: ${res.failureScore} (Holders: ${res.holderConcentration.value}, Dev: ${res.devWalletActivity.value}, Volume: ${res.volumeBehavior.value})`);
    } catch (err: any) {
      console.error(`❌ Failed to scan ${t.name}:`, err.message);
    }
  }

  console.log('\n==================================================');
  console.log('V1 LAUNCH 3-METRIC SUMMARY TABLE:');
  console.table(results);
}

runV1LaunchSuite();
