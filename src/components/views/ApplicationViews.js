import { ShooterViews } from "./ShooterViews"
import { AdminViews } from "./AdminViews"


export const ApplicationViews = () => {
   
    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)
    
    if(StatSlingerObject.admin) {
        return <AdminViews/>
    }
    else {
        return <ShooterViews/>
    }
}