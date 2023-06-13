import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe('Currency Exchange Form', () => {
    let homePage:HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let paymentPage: PaymentPage
    test.beforeEach(async({page})=>{
        homePage=new HomePage(page)
        loginPage=new LoginPage(page)
        navbar=new Navbar(page)
        paymentPage=new PaymentPage(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

  
    test('Should make currency exchange', async ({ page }) => 
    {
        await navbar.clickOnTab('Pay Bills')
        //await page.click("a[href$='#ui-tabs-3']")
        await paymentPage.clickOnLowerTab('Purchase Foreign Currency')

        //select currency option
        await paymentPage.selectCurrency('Eurozone (euro)')
        //type in 1000 for amount
        await paymentPage.setAmt('1000')
        //select USD
        await paymentPage.conversionType(1) //1 for USD, anything else for selected
        //click Calculate Costs
        await paymentPage.calculateCosts()
        //ensure the value is 721.40 euro (EUR) = 1000.00 U.S. dollar (USD)
        await paymentPage.verifyAmt('721.40 euro (EUR) = 1000.00 U.S. dollar (USD)')
        //Purchase
        await paymentPage.purchase()
        //Get and check confirmation msg
        await paymentPage.verifySuccess()
        
        
    })
})