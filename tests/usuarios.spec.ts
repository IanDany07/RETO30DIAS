import {expect, test} from '@playwright/test'

test('usuarios', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox',{name:'username'}).fill('Admin')
    await page.getByRole('textbox',{name:'password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()
    
    //para validar que estemos dentro de la pagina ver el menu Admin
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    //page.getByRole('link',{name:'Menu'}) = localizador
    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    //ahora toca identifiacar la tabla y luego capturamos toda la fila
    // Capturamos toda la fila con "Const rows", ya no va el "await" por que no estoy haciendo una accion solo estamos capturando
    const rows = page.getByRole('table').getByRole('row')

    // Crear un arreglo que va almacenar todo los nombres de usuarios (usernames).
    //=[] voy a iniciar en vacio, osea el array no contiene nada
    const usernames:string[]=[]
    // de la tabla, saltar la primera fila. debemos Tener un contador para hacer una iteracion, para eso
    // debemos hacer el ciclo FOR.

    // voy a contar cuantas filas hay, "await rows.count()" = si hay 8 usuarios mas la cabecera seria 9 
    const rowcount = await rows.count()
     for(let i=1; i< rowcount; i++){
        // para acceder a la fila. // con nth accedo a un elemento que es (rows)
        // entonces, en la 1era iteracion accedo a la fila 2.
        //Dentro de rows existe varias cell.
        const cell=rows.nth(i).getByRole('cell').nth(1)
        // el indice empieza en cero.
        const username = await cell.textContent()
        // si el texto no viene nullo, entonces agregalo, 
        if (username){
            usernames.push(username)
        }

    //imprime todo
    console.log(usernames)



     }


})
