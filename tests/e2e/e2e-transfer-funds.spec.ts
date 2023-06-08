import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { TransferFunds } from '../../page-objects/TransferFunds'

test.describe.parallel("login/logout", () =>{
    //Before hook
    let homePage:HomePage
    let loginPage: LoginPage
    let navbar:Navbar
    let transferFunds:TransferFunds
    test.beforeEach(async({page})=>
    {
        homePage=new HomePage(page)
        loginPage=new LoginPage(page)
        navbar=new Navbar(page)
        transferFunds=new TransferFunds(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
    })
    
    test('positive login', async({page})=>{
        //go to acc summary page
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
        
        //go to transfer funds tab
        await navbar.clickOnTab('Transfer Funds')

        //Select which accounts to use
        await transferFunds.transferMoney()
        
        //confirm we're on the verify page
        await transferFunds.verifyMsgHeader()
        
        //Confirm the success message is visible
        await transferFunds.confirmMsg()
    })
})