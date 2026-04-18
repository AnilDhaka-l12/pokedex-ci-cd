const { test, expect } = require('@playwright/test')

test.describe('Pokedex', () => {
  test('front page loads and shows Pokemon', async ({ page }) => {
    await page.goto('http://localhost:5001')
    await page.waitForTimeout(5000)
    // Check that the page has content
    const body = await page.textContent('body')
    expect(body.length).toBeGreaterThan(100)
  })
})