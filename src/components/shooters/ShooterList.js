import { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import './Shooters.css'

export const ShooterList = () => {
    const [shooters, setShooters] = useState([])

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    const getShooters = () => {fetch(`http://localhost:8088/shooters`)
            .then(response => response.json())
            .then((shootersArray) => {
                setShooters(shootersArray)
            })
        }
    
    useEffect(
        () => {
           getShooters()
        },
        [] // When this array is empty, you are observing initial component state
    )

    const MakeAdmin = (shooterId, shooterName, shooterEmail, shooterAlias) => {

           return  fetch(`http://localhost:8088/shooters/${shooterId}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: shooterId,
                    fullName: shooterName,
                    email: shooterEmail,
                    alias: shooterAlias,
                    isAdmin: true
                })
           })
            .then(response => response.json())
            .then(() => {
                getShooters()
             })
    }
    
    return <>
        <article className="shooterCards">
        {shooters.map((shooter) => {
                if(shooter.id !== parseInt(StatSlingerObject.id) && shooter.isAdmin === false){
                return <Card key={`shooter--${shooter.id}`} className="shooterCard dark"
                inverse
                style={{
                width: '18rem'
                }}
            >
                <CardBody>
                <CardTitle tag="h5">
                    {shooter.fullName}
                </CardTitle>
                <CardSubtitle
                    className="mb-2"
                    tag="h6"
                >
                    {shooter.alias}
                </CardSubtitle>
                <CardText>
                    {shooter.email}
                </CardText>
                    <Button color="light" outline onClick={() => MakeAdmin(shooter.id, shooter.fullName, shooter.email, shooter.alias)}>
                        Grant Admin Status
                    </Button>
                </CardBody>
            </Card> 
                }
            }
        )
    } 
    </article>
    </>
}
