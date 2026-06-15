import {expect, test} from '@playwright/test'

test('Login fallido', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'password'}).fill('admin1234')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByRole('paragraph').getByText('Invalid credentials')).toBeVisible()

})
