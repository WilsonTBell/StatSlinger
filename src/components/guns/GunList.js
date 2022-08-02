import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import './guns.css'

export const GunList = () => {
    const [guns, setGuns] = useState([])
    const navigate = useNavigate()

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    const getGuns = () => {

        fetch(`http://localhost:8088/guns?_expand=type&shooterId=${StatSlingerObject.id}`)
            .then(response => response.json())
            .then((gunsArray) => {
                setGuns(gunsArray)
            })
    }

    useEffect(
        () => {
            getGuns()
        },
        []
    )

    const deleteGun = (gunId) => {
        fetch(`http://localhost:8088/guns/${gunId}`, {
        method: "DELETE",
    })
    .then(() => {getGuns()})
    }

    return <>
        <article className="gunCards">
        {guns.map((gun) => {
                return <Card key={`gun--${gun.id}`} className="gunCard dark"
                inverse
                style={{
                width: '18rem'
                }}
            >
                <CardBody>
                <CardTitle tag="h5">
                    {gun.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2"
                    tag="h6"
                >
                    {gun.type.name}
                </CardSubtitle>
                <CardText>
                    {gun.description}
                </CardText>
                    <Button color="light" outline onClick={() => deleteGun(gun.id)}>
                        Delete Gun
                    </Button>
                </CardBody>
            </Card> 
            }
        )
    } 
     <Card className="gunCard dark"
                inverse
                style={{
                width: '18rem',
                height: '3rem'
                }}>
            <Button color="light" outline onClick={() => navigate("/gunForm")}>
                Add New Gun
            </Button>
         </Card>
    </article>
    </>
}