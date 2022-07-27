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
    const [selectedStage, setSelected] = useState(0)

    const toggle = () => {setModal(!modal)};

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
    </>
}