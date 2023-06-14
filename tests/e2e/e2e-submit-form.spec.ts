import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback Form', () => {
  let homePage: HomePage
  let feedbackPage:FeedbackPage
  
  test.beforeEach(async ({ page }) => 
  {
    homePage = new HomePage(page)
    feedbackPage=new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  //reset form
  test('Reset feedback form', async ({ page }) => {
    //enter info
    await feedbackPage.fillForm('Bobob','some Bob@bobmail.bob','bob','bobobobobo')
    //click clear
    await feedbackPage.resetForm()

    //Ensure name and comment fields are empty
    await feedbackPage.assertReset()
  })
  //submit form
  test("submit feedback form", async({page})=>{
    //enter info
    await feedbackPage.fillForm('Bobob','some Bob@bobmail.bob','bob','bobobobobo')

    //click send message
    await feedbackPage.submitForm()

    //ensure you get to the confirmation page
    await feedbackPage.feedbackFormSent()
  })
})