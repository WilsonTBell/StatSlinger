import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

export const StageForm = () => {
    const {currentMatchId} = useParams()
    const [stages, setStages] = useState([])
    const [stage , update] = useState({
        name: "",
        notes: "",
        matchId: currentMatchId
    })
    const navigate = useNavigate()

    const getStages = () => {
        fetch(`http://localhost:8088/stages?matchId=${currentMatchId}`)
        .then(response => response.json())
        .then((stagesArray) => {
            setStages(stagesArray)
        })
    }

    const handlePostButtonClick = () => {
        
        const stageToSendToAPI = {
            name: stage.name,
            notes: stage.notes,
            matchId: currentMatchId
        }

        return fetch(`http://localhost:8088/stages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stageToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                getStages()
            })
    }

    useEffect(
        () => {
            getStages()
        },
        [currentMatchId] // When this array is empty, you are observing initial component state
    )

    return<> 
    <h3>Stage Form</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="stageName">Stage Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The Name of Your Stage"
                        value={stage.name}
                        onChange={
                            (evt) => {
                                const copy = {...stage}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="stageNotes">Stage Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Any Notes on Your Stage"
                        value={stage.notes}
                        onChange={
                            (evt) => {
                                const copy = {...stage}
                                copy.notes = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <Button color="light" outline onClick={() => handlePostButtonClick()}>
                Post Stage
        </Button>
        <article className="stageCards">
    {stages.map((stage)=>{
        return<Card key={`stage--${stage.id}`} className="stageCard"
        inverse
        style={{
          width: '18rem'
        }}
      >
        <CardBody>
          <CardTitle tag="h5">
            {stage.name}
          </CardTitle>
          <CardText>
             {stage.notes}
          </CardText>
        </CardBody>
      </Card>  
            }
        )
    }
    </article>
    <Button color="light" outline onClick={() => navigate('/adminMatches')}>
                Finish
    </Button>
    </>
}