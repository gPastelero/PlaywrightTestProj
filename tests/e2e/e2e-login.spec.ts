import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import {HomePage} from '../../page-objects/HomePage'

test.describe.parallel("login/logout", () =>{
    let loginPage:LoginPage
    let homePage: HomePage

    //Before hook
    test.beforeEach(async({page})=>
    {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        
        await homePage.visit()
    })

    //negative scenario
    test('negative login', async({page})=>{
        await homePage.clickOnSignIn()
        await loginPage.login('invalidName','invalidPass')
        await loginPage.assertErrorMessage() //get and check error msg
    })

    //positive scenario
    test('positive login', async({page})=>{
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        //find account summary tab to ensure login success
        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        //logout
        await page.goto('http://zero.webappsecurity.com/logout.html')

        //ensure we are on homepage after logout
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})