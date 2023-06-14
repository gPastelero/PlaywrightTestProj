import {test} from '@playwright/test'
import {HomePage} from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel.only('Login Page Visual Tests', ()=>
{
    let homepage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        loginPage = new LoginPage(page)
    
        await homepage.visit()
        await homepage.clickOnSignIn()
      })
    
      test('Login Form', async ({ page }) => {
        await loginPage.snapshotLoginForm()
      })
    
      test('Login Error Message', async ({ page }) => {
        await loginPage.login('Fail', 'some invalid password')
        await loginPage.snapshotErrorMessage()
      })
})