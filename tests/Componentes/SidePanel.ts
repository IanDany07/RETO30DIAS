import { Locator, Page } from "@playwright/test";

export class Sidepanel{
    readonly page:Page

    constructor(page:Page){
        this.page= page

    }
    // creamos un localizador en el cual yo pueda pasar el: Name (Admin, PIM, Leave.....) de forma dinamica. Oh que me lo pasen de algun lado.
    private menuOpcion(Option: SideMenuOpcion):Locator{
        // en el option va depender de lo que me pasan: si es admin-> en el option será: Admin, ......
        return this.page.getByRole('link',{name: Option})
    }
    // aqui en el metodo: me pasan el option que quieren cliclear desde el tipo: SideMenuOpcion
    async clicEnOpcion(Option:SideMenuOpcion){
        await this.menuOpcion(Option).click()


    }

}
// Creamos una numeracion:
export enum SideMenuOpcion{
    
    ADMIN = 'Admin',
    PIM= 'PIM',
    LEAVE='Leave',
    TIME='Time',
    RECRUITMENT='Recruitment',
    MY_INFO='My Info',
    PERFORMANCE='Performance',
    DASHBOARD='Dashboard',
    DIRECTORY='Directory',
    MAINTENANCE='Maintenance',
    CLAIM='Claim',
    BUZZ='Buzz'
    
}