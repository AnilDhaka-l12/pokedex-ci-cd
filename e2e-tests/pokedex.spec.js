const { test, expect } = require('@playwright/test')

test.describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(3000)
    // Check for capitalized name as displayed in the UI
    await expect(page.getByText('Bulbasaur')).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to individual pokemon page', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(3000)
    await page.click('text=Bulbasaur')
    await page.waitForTimeout(2000)
    await expect(page.getByText('overgrow')).toBeVisible({ timeout: 10000 })
  })
})