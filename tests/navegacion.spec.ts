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
    await page.goto('https://opensource-demo.orangehrmlive.com')
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

// DIA 5: Desde el menu Admin. Crear una expectativa, cuando se realice un clic en el sub menu de Qualificacion, abre la pagina y se muestra su URL, 
// luego, cierra la pagina para volver a seleccionar otra sub menu. 

test ('navegar por el sub menu', async ({page})=>{
    test.setTimeout(120000)

    // Definimos la expectiva. Realizamos un arreglo. Agregamos la url que esperamos q aparesca cuando hacemos clic
    const expectativapaginas =[

        {
            menu: 'Skills', 
            url:'/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education', 
            url:'/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses', 
            url:'/web/index.php/admin/viewLicenses'
        },
    ]
    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox',{name: 'Username'}).fill('Admin')
    await page.getByRole('textbox',{name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.getByRole('link',{name:'Admin'}).click()
    
    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Qualifications').click()
    // desde el 'menu' dame todo los 'Li' que tiene, y almacenamos toda la lista
    const capMenuCalificacion = page.getByRole('menu').locator('li')

    // Ahora, iterar sobre la expectativa. Yo espero las paginas: Skill, Education, etc
    for( let expectedPage of expectativapaginas){
        // todo lo que ha capturado, filtrarme por un texto. 
        const menuopcion = capMenuCalificacion.filter({hasText: expectedPage.menu})
        await menuopcion.click()
        
        //expect(page).toHaveURL: espero que la pagina tenga una url:
        //toHaveURL: epera que la pagina tenga un url especica (en un cierto tiempo)
        //toHaveURL: valida toda la url:https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLicenses
        //await expect(page).toHaveURL(expectedPage.url)

        //new RegExp: valida solo una porcion de la url:../web/index.php/admin/viewLicenses -> hace clic y aparece la URL
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        //para que vuelva abrir el menu despues de hacer clic en caulquier menu.
        await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Qualifications').click()
        
    }
})

// RETO DIA 5: realizar una expectativa con otros menus.
test('Navegar menu con expectativa', async ({page})=>{
    test.setTimeout(120000)
    const expectivapaginas1 = [
        { menu:'General Information', url:'/web/index.php/admin/viewOrganizationGeneralInformation'
        },
        { menu:'Location', url:'/web/index.php/admin/viewLocations'
        },
        { menu:'Structure', url:'/web/index.php/admin/viewCompanyStructure'
        },
    ]
    

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox',{name: 'Username'}).fill('Admin')
    await page.getByRole('textbox',{name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.getByRole('link',{name:'Admin'}).click()

    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Organization').click()
    const capmenu2= page.getByRole('menu').locator('li')

    // for..of: recorre todo los elementos de la lista expectivapaginas1: osea, 
    // para cada PaginaEsperada que esta dentro de expectivapaginas1, has lo siguiente:
    for(let PaginaEsperada of expectivapaginas1){
        const capmenu4 = capmenu2.filter({hasText:PaginaEsperada.menu})
        await capmenu4.click()
        console.log('Estamos en el menu:', capmenu4)

        await expect(page).toHaveURL(new RegExp(PaginaEsperada.url))
        await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Organization').click()

    }





}


)
