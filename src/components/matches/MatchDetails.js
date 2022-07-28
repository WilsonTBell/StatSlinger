import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { StatForm } from "./StatForm";
import './MatchList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MatchDetails = () => {
    const {matchId} = useParams()
    const [stages, setStages] = useState([])
    const [modal, setModal] = useState(false);
    const [selectedStage, setSelected] = useState(0)
    const navigate = useNavigate()

    const toggle = () => {setModal(!modal)};

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    useEffect(
        () => {
            fetch(`http://localhost:8088/stages?matchId=${matchId}`)
            .then(response => response.json())
            .then((stagesArray) => {
                setStages(stagesArray)
            })
        },
        [matchId] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if(selectedStage > 0){toggle()}
        },
        [selectedStage]
    )

    const handleComplete = (id) => {
       
        const completedMatchToSendToAPI = {
            matchId: parseInt(id),
            shooterId: StatSlingerObject.id 
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/completedMatches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completedMatchToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/matches")
            })
    }

    return <>
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
          <Button color='light' outline  onClick={() => setSelected(stage.id)} data-bs-target={`#modal--${stage.id}`}>
            Add Stats
          </Button>
            <Modal key={`modal--${stage.id}`} className="statFormModal" isOpen={modal} toggle={toggle} unmountOnClose={true}>
                <ModalHeader className="statFormModalHeader text-white" toggle={toggle}>Stat Form</ModalHeader>
                    <ModalBody className="statFormModalBody">
                       <StatForm
                       key={`statForm--${stage.id}`}
                       matchId={matchId}
                       stageId={selectedStage}
                       paramFunction={toggle}
                       />
                    </ModalBody>
                <ModalFooter className="statFormModalFooter">
                    <Button color='light' outline onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </CardBody>
      </Card>  
            }
        )
    }
    </article>
    <Button color="light" outline onClick={() => handleComplete(matchId)}>
            Finish
    </Button>
    </>
}