import { useState } from "react"

import { MatchForm } from "./MatchForm"
import { StageForm } from "./StageForm"

export const Form = () => {
    const [stageCounter, setStageCounter] = useState(0)

    return <>
    <MatchForm 
    setterFunction={setStageCounter}
    />
    <StageForm
    countVariable={stageCounter}    
    />
    </>
}