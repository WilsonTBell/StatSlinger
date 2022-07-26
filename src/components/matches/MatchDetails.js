import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { StatForm } from "./StatForm";
import './MatchList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MatchDetails = () => {
    const {matchId} = useParams()
    const [stages, setStages] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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

    return <>
        <article className="stageCards">
    {stages.map((stage)=>{
        return<Card className="stageCard"
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
          <Button color='light' outline  onClick={toggle}>
            Add Stats
          </Button>
            <Modal className="statFormModal" isOpen={modal} toggle={toggle}>
                <ModalHeader className="statFormModalHeader text-white" toggle={toggle}>Stat Form</ModalHeader>
                    <ModalBody className="statFormModalBody">
                       <StatForm
                       key={`statForm--${stage.id}`}
                       matchId={matchId}
                       stageId={stage.id}
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
    </>
}