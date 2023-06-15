import {test, expect} from '@playwright/test'

//Screenshots will be compared. If the screenshots are different due to changes, the 
//test will fail
test.describe("Visual Regression Testing Example",() =>{
    test('Full Page Snapshot',async({page})=>{
       await page.goto('http://example.com/') 
       expect (await page.screenshot()).toMatchSnapshot('test-results/homepage.png')
    })

    test('Single Element Snapshot', async({page})=>
    {
        await page.goto('http://example.com/') 
        const pageElement = await page.locator('h1')
        expect (await pageElement.screenshot()).toMatchSnapshot('test-results/page-title.png')
    })
})