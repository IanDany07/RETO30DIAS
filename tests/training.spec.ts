import{test} from '@playwright/test'

test('Login sause demo', async ({page}) => {
  
    await page.goto('https://www.saucedemo.com')

    await page.getByRole('textbox', {name:'username'}).fill('standard_user')
   
    await page.getByRole('textbox', {name:'password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'login'}).click()
})