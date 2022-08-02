import { Route, Routes } from "react-router-dom"
import { GunForm } from "../guns/GunForm"
import { GunList } from "../guns/GunList"
import { MatchDetails } from "../matches/MatchDetails"
import { MatchList } from "../matches/MatchList"
import { AdminMatches } from "../matchManagement/AdminMatches"
import { MatchForm } from "../matchManagement/MatchForm"
import { StageForm } from "../matchManagement/StageForm"
import { StatList } from "../stats/StatList"

export const AdminViews = () => {
    return <>
    <Routes>
        <Route path="/" element={ <StatList /> } />
        <Route path="/matches" element={ <MatchList /> } />
        <Route path="/matches/:matchId" element={ < MatchDetails/>} />
        <Route path="/adminMatches" element={ < AdminMatches/>} />
        <Route path="/matchForm" element={ < MatchForm/>} />
        <Route path="/matchForm/:currentMatchId" element={ < StageForm/>} />
        <Route path="/guns" element={ < GunList/>} />
        <Route path="/gunForm" element={ < GunForm/>} />
    </Routes>
    </>
}