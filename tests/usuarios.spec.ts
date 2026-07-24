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
    //getBytext=encontra elemento por texto (User managment) dentro del elemento (topbar Menu)
    //osea: getBytext (Permite localizar elementos que contienen un texto determinado)
    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    //ahora toca identifiacar la tabla y luego capturamos toda la fila
    // Capturamos toda la fila con "Const rows", ya no va el "await" 
    // por que no estoy haciendo una accion solo estamos capturando
    // capturamos toda la fila con rows desde una tabla, y capturamos la fila con el nombre (row) de la pagina
    const rows = page.getByRole('table').getByRole('row')

    // Crear un arreglo que va almacenar todo los nombres de usuarios (usernames).
    //=[] voy a iniciar en vacio, osea el array no contiene nada
    const usernames:string[]=[]
    // de la tabla, saltar la primera fila. debemos Tener un contador para hacer una iteracion, para eso
    // debemos hacer el ciclo FOR.
    // voy a contar cuantas filas hay con "await rows.count()" = si hay 8 usuarios mas la cabecera seria 9 
    const rowcount = await rows.count()
     for(let i=1; i< rowcount; i++){
        // para acceder a la fila. // con nth accedo a un elemento que es (rows)
        // entonces, en la 1era iteracion accedo a la fila 2.
        //Dentro de rows existe varias cell. (nth es la clave)-> cell es el nombre del rol de la subfila
        //nth(1) es la segunda columna de la tabla. // "cell=celda" es propio del playwright
        const cell=rows.nth(i).getByRole('cell').nth(1)
        // el indice empieza en cero. El TextContent es un metodo para capturar el texto. Puede capturar un texto o puede ser nulo
        // -> el texto capturado lo tenemos que agregarlo al arreglo (usernames)
        const username = await cell.textContent()
        // El push(usermame) si o si espera un estring (texto) entonces
        // hacemos la condicion if(){}
        if (username){
            //si el texto no viene nullo, entonces agregalo a usernames desde username=texto capturado
            usernames.push(username)
        }
     }
    //imprime todo los usuarios de la interface grafica
    console.log(usernames)
})

//EL RETO ES DE CREAR UN NUEVO SCRIP DONDE DEVOLVEMOS LOS NOMNBRES DE LOS EMPLEADOS

test('nombre de usuario', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox',{name:'Username'}).fill('admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const filas = page.getByRole('table').getByRole('row')
    const nombreusuarios: string[]=[]
    const contadorfila = await filas.count()
    for(let i=1; i < contadorfila; i++){
        const celdacolumna = filas.nth(i).getByRole('cell').nth(3)
        const nombreusuario = await celdacolumna.textContent()
        if (nombreusuario){
            nombreusuarios.push(nombreusuario)
        }
    }
    console.log(nombreusuarios)
})