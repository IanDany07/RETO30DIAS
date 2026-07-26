import{test, expect} from '@playwright/test'
test ('navegacion', async ({page})=> {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button', {name:'Login'}).click()

    const capturaListaMenu= page.getByLabel('Sidepanel').getByRole('listitem')
    const ContadorListaMenu= await capturaListaMenu.count()
    //imprime cuantos menus hay, osea Contador Menu 12
    console.log('Contador Menu', ContadorListaMenu)

    const recuentoMenuItem: String[]=[]

    for(let i=0; i<ContadorListaMenu; i++){
        const MenuTexto = await capturaListaMenu.nth(i).innerText()
        recuentoMenuItem.push(MenuTexto)
    }
    //se imprimen solo el menu "Admin"
    console.log(recuentoMenuItem[0])
    //se imprimen los 12 menús porque tienes esta línea
    console.log(recuentoMenuItem)
    //voy a comparar los resultados con la expectativa
    const expectativaMenu =[
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    expect(recuentoMenuItem).toEqual(expectativaMenu)

    // Reto Dia 3: agregar una assertion para validar que la primera opcion del menu "Admin" sea "Admin"
    expect(recuentoMenuItem[0]).toBe('Admin')
})