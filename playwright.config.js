module.exports = {
  testDir: './e2e-tests',
  use: {
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npm start',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
}