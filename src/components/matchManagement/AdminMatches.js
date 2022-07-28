import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

export const AdminMatches = () => {
    const [matches, setMatches] = useState([])
    const [stages, setStages] = useState([])
    const navigate = useNavigate()

    const getMatches = () => {fetch(`http://localhost:8088/matches`)
            .then(response => response.json())
            .then((matchesArray) => {
                setMatches(matchesArray)
            })
        }
    
    useEffect(
        () => {
           getMatches()
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/stages`)
            .then(response => response.json())
            .then((stagesArray) => {
                setStages(stagesArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    const deleteMatch = (matchId) => {
        fetch(`http://localhost:8088/matches/${matchId}`, {
        method: "DELETE",
    })
    .then(() => {getMatches()})
    }

    return <>
        <article className="matchCards">
        {matches.map((match) => {
                return <Card key={`adminMatch--${match.id}`} className="matchCard dark"
                inverse
                style={{
                width: '18rem'
                }}
            >
                <img
                alt= ""
                src={match.image}
                />
                <CardBody>
                <CardTitle tag="h5">
                    {match.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2"
                    tag="h6"
                >
                    {match.date}
                </CardSubtitle>
                    <Button color="light" outline onClick={() => deleteMatch(match.id)}>
                        Delete Match
                    </Button>
                    <Button color="light" outline onClick={() => navigate(`/matchForm/${match.id}`)}>
                        Add Stages
                    </Button>
                </CardBody>
            </Card> 
            }
        )
    } 
     <Card className="matchCard dark"
                inverse
                style={{
                width: '18rem',
                height: '3rem'
                }}>
            <Button color="light" outline onClick={() => navigate("/matchForm")}>
                Create New Match
            </Button>
         </Card>
    </article>
    </>
}