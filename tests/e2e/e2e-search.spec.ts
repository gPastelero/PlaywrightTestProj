import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Search Results',()=>
{
    let homePage:HomePage
    test('Should find search results', async({page})=>{
        homePage=new HomePage(page)
        await homePage.visit()

        await homePage.searchForPhrase('bank')

        const numLinks = await page.locator('li > a')
        await expect(numLinks).toHaveCount(2)
    })
})