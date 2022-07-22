import { Route, Routes } from "react-router-dom"
import { StatList } from "../stats/StatList"

export const ShooterViews = () => {
    return <>
    <Routes>
        <Route path="/" element={ <StatList /> } />
    </Routes>
    </>
}