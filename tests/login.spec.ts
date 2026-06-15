import {expect, test} from '@playwright/test'

test('Login demo', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox',{name:'username'}).fill('Admin')
    await page.getByRole('textbox',{name:'password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    //para validar que estemos dentro de la pagina ver el menu Admin
    await expect(page.getByRole('link',{name:'Menu'})).toBeVisible() 

    //RETO: automatizar el login fallido

})
