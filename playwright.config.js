const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://localhost:5001',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})