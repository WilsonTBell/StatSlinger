import { Route, Routes } from "react-router-dom"
import { GunForm } from "../guns/GunForm"
import { GunList } from "../guns/GunList"
import { MatchDetails } from "../matches/MatchDetails"
import { MatchList } from "../matches/MatchList"
import { StatList } from "../stats/StatList"

export const ShooterViews = () => {
    return <>
    <Routes>
        <Route path="/" element={ <StatList /> } />
        <Route path="/matches" element={ <MatchList /> } />
        <Route path="/matches/:matchId" element={ < MatchDetails/>} />
        <Route path="/guns" element={ < GunList/>} />
        <Route path="/gunForm" element={ < GunForm/>} />
    </Routes>
    </>
}