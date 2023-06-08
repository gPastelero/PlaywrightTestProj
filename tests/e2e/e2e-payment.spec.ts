import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import {Navbar} from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe.parallel("New payment", () =>{
    //Before hook
    let homePage:HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let paymentPage: PaymentPage
    test.beforeEach(async({page})=>
    {
      homePage=new HomePage(page)
      loginPage=new LoginPage(page)
      navbar=new Navbar(page)
      paymentPage=new PaymentPage(page)
      await homePage.visit()
      await homePage.clickOnSignIn()
      await loginPage.login('username','password')
    })

    test('Should send new payment', async ({ page }) =>
    {
      await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
      //go to pay bills tab
      await navbar.clickOnTab('Pay Bills')

      //create payment
      await paymentPage.createPayment()
  
      //confirm confirmation msg is visible
      await paymentPage.assertSuccessMessage()
    })
})