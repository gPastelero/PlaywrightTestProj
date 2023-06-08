import{expect, Locator, Page} from '@playwright/test'

export class TransferFunds
{
    readonly page: Page
    readonly fromAcc: Locator
    readonly toAcc: Locator
    readonly amount: Locator
    readonly desc: Locator
    readonly continueBtn: Locator
    readonly verifyMsg:Locator
    readonly submitBtm: Locator
    readonly msg:Locator

    constructor(page:Page)
    {
        this.page=page
        this.fromAcc=page.locator('#tf_fromAccountId')
        this.toAcc=page.locator('#tf_toAccountId')
        this.amount=page.locator('#tf_amount')
        this.desc=page.locator('#tf_description')
        this.continueBtn=page.locator('#btn_submit')
        this.verifyMsg=page.locator('h2.board-header')
        this.submitBtm=page.locator("//button[text()='Submit']")
        this.msg=page.locator('.alert.alert-success')
    }

    async transferMoney()
    {
        //Select which accounts to use
        await this.fromAcc.selectOption('2')
        await this.toAcc.selectOption('3')
        await this.amount.type('500')
        await this.desc.type('Test message')
        await this.continueBtn.click()        
    }
    async verifyMsgHeader()
    {
        await expect(this.verifyMsg).toContainText('Verify')
        await this.submitBtm.click()
    }
    async confirmMsg()
    {
        await expect(this.msg).toBeVisible()
        await expect(this.msg).toContainText('You successfully submitted your transaction.')
    }

}