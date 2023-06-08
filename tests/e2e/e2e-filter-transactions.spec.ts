import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel("Filter transactions", () =>{
    let homePage:HomePage
    let loginPage: LoginPage
    //Before hook
    test.beforeEach(async({page})=>{
        homePage=new HomePage(page)
        loginPage=new LoginPage(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
    })

    test('Verify the results for each account', async({page})=>{
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
        await page.click('#account_activity_tab')

        await page.selectOption('#aa_accountId','Checking')
        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        //ensure there are only 3 results in checking account
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        //ensure there are only 2 results on loan transactions
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', 'Brokerage')
        const noResults = await page.locator('.well')
        //ensure there are no results on brokerage
        await expect(noResults).toBeVisible()
    })
})