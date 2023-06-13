import{expect, Locator, Page} from '@playwright/test'

export class PaymentPage
{
    //Pay Saved Payee
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectbox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    //Second Navbar
    readonly paySavedPayee: Locator
    readonly addNewPayee: Locator
    readonly purchaseForeignCurrency: Locator

    //Purchase Foreign Currency
    readonly currencyType: Locator
    readonly amount: Locator
    readonly toUSD: Locator
    readonly toSelected: Locator
    readonly calculateCostsBtn: Locator
    readonly convAmt:Locator
    readonly purchaseBtn: Locator
    readonly successAlert: Locator

    constructor(page:Page)
    {
      this.page = page
      this.payeeSelectbox = page.locator('#sp_payee')
      this.payeeDetailButton = page.locator('#sp_get_payee_details')
      this.payeeDetail = page.locator('#sp_payee_details')
      this.accountSelectbox = page.locator('#sp_account')
      this.amountInput = page.locator('#sp_amount')
      this.dateInput = page.locator('#sp_date')
      this.descriptionInput = page.locator('#sp_description')
      this.submitPaymentButton = page.locator('#pay_saved_payees')
      this.message = page.locator('#alert_content > span')

      this.paySavedPayee=page.locator("a[href$='#ui-tabs-1']")
      this.addNewPayee=page.locator("a[href$='#ui-tabs-2']")
      this.purchaseForeignCurrency=page.locator("a[href$='#ui-tabs-3']")

      this.currencyType=page.locator('#pc_currency')
      this.amount=page.locator('#pc_amount')
      this.toUSD=page.locator('#pc_inDollars_true')
      this.toSelected=page.locator('pc_inDollars_false')
      this.calculateCostsBtn=page.locator('#pc_calculate_costs')
      this.convAmt=page.locator('#pc_conversion_amount')
      this.purchaseBtn=page.locator('#purchase_cash')
      this.successAlert=page.locator('#alert_content')
    }
    async createPayment() 
    {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectbox.selectOption('6')
        await this.amountInput.type('5000')
        await this.dateInput.type('2021-11-09')
        await this.descriptionInput.type('Some message')
        await this.submitPaymentButton.click()
    }
    
    async assertSuccessMessage() 
    {
      await expect(this.message).toBeVisible()
      await expect(this.message).toContainText('The payment was successfully submitted')
    }

    async clickOnLowerTab(tab:string)
    {
      switch (tab)
        {
          case 'Pay Saved Payee':
            await this.paySavedPayee.click()
            break
          case 'Add New Payee':
            await this.addNewPayee.click()
            break
          case 'Purchase Foreign Currency':
            await this.purchaseForeignCurrency.click()
            break
          default:
            throw new Error('This tab does not exist..')
        }
    }

    //Foreign Currencies tab
    async selectCurrency(currency:string)
    {
      await this.currencyType.selectOption(currency)
    }
    
    async setAmt(amt:string)
    {
      await this.amount.type(amt)
    }

    async conversionType(type:number)
    {
      if(type == 1)
        await this.toUSD.click()
      else
        await this.toSelected.click()
    }

    async calculateCosts()
    {
      await this.calculateCostsBtn.click()
    }

    async verifyAmt(expected:string)
    {
      await expect(this.convAmt).toContainText(expected)
    }

    async purchase()
    {
      await this.purchaseBtn.click()
    }

    async verifySuccess()
    {
      await expect(this.successAlert).toBeVisible()
    }
    
}