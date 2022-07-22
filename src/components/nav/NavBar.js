
import { AdminNavBar } from "./AdminNavBar"
import "./NavBar.css"
import { ShooterNavBar } from "./ShooterNavBar"


export const NavBar = () => {


    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)
    
    if(StatSlingerObject.admin) {
        return <AdminNavBar/>
    }
    else {
        return <ShooterNavBar/>
    }  
}