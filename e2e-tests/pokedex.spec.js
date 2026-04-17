const { test, expect } = require('@playwright/test')

test.describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:8080')
    await page.waitForTimeout(2000)
    await expect(page.getByText('bulbasaur')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to individual pokemon page', async ({ page }) => {
    await page.goto('http://localhost:8080')
    await page.waitForTimeout(2000)
    
    // Click on bulbasaur
    await page.click('text=bulbasaur')
    await page.waitForTimeout(2000)
    
    // Log the page content to see what's there
    const content = await page.content()
    console.log('Page content after click:', content.substring(0, 500))
    
    // Try to find abilities
    await expect(page.getByText('overgrow')).toBeVisible({ timeout: 10000 })
  })
})