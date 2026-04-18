const { test, expect } = require('@playwright/test')

test.describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5001')
    await page.waitForTimeout(2000)
    await expect(page.getByText('bulbasaur')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to individual pokemon page', async ({ page }) => {
    await page.goto('http://localhost:5001')
    await page.waitForTimeout(2000)
    await page.click('text=bulbasaur')
    await page.waitForTimeout(1000)
    await expect(page.getByText('overgrow')).toBeVisible({ timeout: 10000 })
  })
})