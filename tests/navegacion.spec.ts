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

//DIA 4: Realizar una funcion que permita realizar o hacer clic en todo los menus. Y omitir el menu que tiene otro enlace.

test('Navegar en los menus', async ({page})=>{
    // Cada prueba tiene un tiempo máximo de 30 segundos.-> ahora tiene 2 minutos
    test.setTimeout(120000)
    await page.goto('https://opensource-demo.orangehrmlive.com/web')
    await page.getByRole('textbox',{name: 'Username'}).fill('Admin')
    await page.getByRole('textbox',{name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()

    const capListaMenu = page.getByLabel('Sidepanel').getByRole('listitem')
    const contListaMenu = await capListaMenu.count()
   
    for(let i=0; i<contListaMenu; i++){
        const capmenu = capListaMenu.nth(i)
        const Menutext = await capmenu.innerText()
        
        console.log('El menu es', Menutext)
        // cuando llega al menu Maintenance, no hace clic y se salta a otro menu
        if(Menutext !== 'Maintenance'){
            await capmenu.click()
        }   
    }

})

//RETO 4: Reto cumplido dia 4-> Se requiere una modificacion de la funcion, que no se salte del menu 'Maintenance',
// si no, cuando el recorrdido de la prueba llega en el menu 'Maintenance' ingrese a la URL y luego este retorne a la pagina principal
// la hacer clic en la flecha izquierda del navegador. Una vez retornado a la pagina principal continue con el recorrido de la prueba sin perder la secuencia,
// osea continua con el menu Claim y Buzz y finaliza la prueba.

test('regresar a la pagina principal', async({page})=>{
    test.setTimeout(120000)
    await page.goto('https://opensource-demo.orangehrmlive.com/web')
    await page.getByRole('textbox',{name: 'Username'}).fill('Admin')
    await page.getByRole('textbox',{name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()

    const capturaLisMenu = page.getByLabel('Sidepanel').getByRole('listitem')
    const contadorListaMenu = await capturaLisMenu.count()
    console.log('La cantidad de menu es', contadorListaMenu)

    const Menutexts: String[]=[]

    for(let i=0; i<contadorListaMenu; i++ ) {
        const newcapmenu= capturaLisMenu.nth(i)
        const text = await newcapmenu.innerText()
        Menutexts.push(text)
        console.log('El menu es:', text)
        
        if(text === 'Maintenance'){
             
             //Hacer clic en Maintenance
             await newcapmenu.click()

             //Verificar que estamos en la URL correcta
             const actualURL=page.url()
             console.log('URl de Maintenance', actualURL)

             //Volver a la página anterior (dashboard)
             await page.goBack();

             // esperar un momento para asegurar que la página está estable 1 segundo
             await page.waitForTimeout(1000)
        } else{
            await newcapmenu.click()
        }
          
    }

})
