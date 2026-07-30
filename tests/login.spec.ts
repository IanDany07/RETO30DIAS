import {expect, test} from '@playwright/test'
import { SideMenuOpcion, Sidepanel } from './Componentes/SidePanel'
import { LoginPage } from './ObjetosPagina/loginPagina'

test('Login demo', async({page}) => {

    //para validar que estemos dentro de la pagina ver el menu Admin
    //await expect(page.getByRole('link',{name:'Menu'})).toBeVisible() 

    //dia 7: refactorizamos el login
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    // dia 8: Aqui se llama el Sidepanel creado en el componente. -> se puede llamar el Sidepanel en cualquier otra prueba
    const sidePanel = new Sidepanel(page)
    await sidePanel.clicEnOpcion(SideMenuOpcion.ADMIN)
    await sidePanel.clicEnOpcion(SideMenuOpcion.BUZZ)
    await sidePanel.clicEnOpcion(SideMenuOpcion.CLAIM)

    // no considerar este codigo, es hecho por mi para probar
    console.log(' se esta haciendo clic en:', SideMenuOpcion)
    

})

// Reto Dia 8: Meter la funcionalidad de (Search) dentro de "ObjetosPagina.ts" y aplicar la busca de cualquier menu de la lista y que sea visible al momento de buscar.
