import {test, expect} from '@playwright/test'
import {loadHomePage,assertTitle} from '../helpers'

test.skip('Simple basic test', async({page})=>{
    await page.goto('http://example.com/')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test.skip('Click on Element', async({page})=>{
    await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
    // text
    await page.click('text=some text')
  
    // Css Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')
  
    // Only visible Css Selector
    await page.click('.submit-button:visible')
  
    // Combinations
    await page.click('#username .first')
  
    // XPath
    await page.click('//button')
  })

test.describe('My first test suite', () => {
    test('Working with Inputs @myTag', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')

        await page.type("//input[@id='user_login']", 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')

        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    test('Assertions @myTag @tag2', async ({ page }) => {
      await page.goto('https://example.com/')
      await expect(page).toHaveURL('https://example.com/')
      await expect(page).toHaveTitle('Example Domain')
    
      const element = await page.locator('h1')
      await expect(element).toBeVisible()
      await expect(element).toHaveText('Example Domain') //Must contain exactly
      await expect(element).toHaveCount(1)
    
      const nonExistingElement = await page.locator('h5')
      await expect(nonExistingElement).not.toBeVisible()
    })
})

test("Screenshots @ss",async({page})=>
{
  await page.goto('https://example.com/')

  //take screenshot
  await page.screenshot({path: 'test-results/screenshot.png', fullPage: true}) //fullpage screenshot

  const element = await page.locator('h1')
  await element.screenshot({path: 'test-results/screenshot2.png'}) //single element screenshot
})

test.describe.parallel.only('Hooks', () =>{
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/')
  })

  test("Screenshots @ss",async({page})=>
  {
    //take screenshot
    await page.screenshot({path: 'test-results/screenshot.png', fullPage: true}) //fullpage screenshot

    const element = await page.locator('h1')
    await element.screenshot({path: 'test-results/screenshot2.png'}) //single element screenshot
  })
})

test('Custom Helpers', async ({ page }) => {
  await loadHomePage(page)
  // await page.pause()
  await assertTitle(page)
})
