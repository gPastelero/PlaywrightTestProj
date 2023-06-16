import {test, expect} from '@playwright/test'
import { getRandomNumber,getRandomString } from '../../utils/data-helpers'

//testing playwright features
test.describe.skip('Tips & Tricks',()=>
{
    test('TestInfo Object', async ({page}, testInfo)=>
    {
        await page.goto('http://example.com/')
        //console.log(testInfo)
        console.log(testInfo.title)
        console.log(testInfo.expectedStatus)
        let newNumber = await getRandomNumber()
        console.log(newNumber)

        let newString = await getRandomString()
        console.log(newString)
    })

    test('Test Skip Browser', async ({page, browserName}, testInfo)=>
    {
        //skip test if in chrome
        test.skip(browserName==="chromium", 'Feature not ready in chrome')
        await page.goto('http://example.com/')
        //console.log(testInfo)
        console.log(testInfo.title)
        console.log(testInfo.expectedStatus)

    })

    test('Test Fixme Annotation', async ({page, browserName}, testInfo)=>
    {
        //skip test if in chrome
        //use this to mark that something needs to be changed.
        test.fixme(browserName==="chromium", 'Fix this test, Jimmy.')
    })

    const people = ['John','Bob','Obama','Steve MC']
    for (const name of people)
    {
        test(`Running test for ${name}`,async ({page})=>
        {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
        })
    }

    test('Mouse Movement', async ({page})=>
    {
        //skip test if in chrome
        //use this to mark that something needs to be changed.
        await page.goto('http://example.com/')
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0,0)
        await page.mouse.up()
    })

    test("Multiple Browser Tabs inside 1 browser", async ({browser})=>
    {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()

        await page1.goto('http://zero.webappsecurity.com/index.html')
        await page2.goto('http://example.com/')
    })
})