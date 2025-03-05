// global-setup.ts
import { FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function globalSetup(config: FullConfig) {
  console.log('Setting up Playwright tests...');

  // I don't have any use for this, this is just a proof of concept
  const testEnv = process.env.TEST_ENV || 'test';
  console.log(`configFile: ${config.configFile}`);
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${testEnv}`),
  });

  console.log(`Test environment: ${testEnv}`);
  console.log('Setup completed successfully');
}

export default globalSetup;
