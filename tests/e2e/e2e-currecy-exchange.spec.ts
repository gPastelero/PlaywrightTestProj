import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Currency Exchange Form', () => {
    let homePage:HomePage
    let loginPage: LoginPage
    test.beforeEach(async({page})=>{
        homePage=new HomePage(page)
        loginPage=new LoginPage(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

  
    test('Should make currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click("a[href$='#ui-tabs-3']")

        //select currency option
        await page.selectOption('#pc_currency','Eurozone (euro)')
        //type in 1000 for amount
        await page.type('#pc_amount','1000')
        //select USD
        await page.click('#pc_inDollars_true')
        //click Calculate Costs
        await page.click('#pc_calculate_costs')
        //ensure the value is 721.40 euro (EUR) = 1000.00 U.S. dollar (USD)
        const actualAmt = await page.locator('#pc_conversion_amount')
        await expect(actualAmt).toContainText(
            '721.40 euro (EUR) = 1000.00 U.S. dollar (USD)')
        
        //Purchase
        await page.click('#purchase_cash')

        //Get and check confirmation msg
        const confirm = await page.locator('#alert_container')
        await expect(confirm).toBeVisible()
        await expect(confirm).toContainText('Foreign currency cash was successfully purchased.')
})
})