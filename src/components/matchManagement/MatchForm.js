import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

export const MatchForm = () => {
    const navigate = useNavigate()
    const [match, update] = useState({
        name: '',
        date: '',
        image: ''
    })

    const handlePostButtonClick = () => {
        
        const matchToSendToAPI = {
            name: match.name,
            date: match.date,
            image: match.image
        }

        return fetch(`http://localhost:8088/matches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matchToSendToAPI)
        })
            .then(response => response.json())
            .then((response) => {
               navigate(`/matchForm/${response.id}`)
            })
    }


    return <>
    <form className="matchForm">
        <fieldset>
                <div className="form-group">
                    <label htmlFor="matchName">Match Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The Name of Your Match"
                        value={match.name}
                        onChange={
                            (evt) => {
                                const copy = {...match}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="matchName">Match Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="The Date of Your Match"
                        value={match.date}
                        onChange={
                            (evt) => {
                                const copy = {...match}
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="matchName">Match Image:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The Image URL of Your Match"
                        value={match.image}
                        onChange={
                            (evt) => {
                                const copy = {...match}
                                copy.image = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <Button color="light" outline onClick={() => handlePostButtonClick()}>
                Post Match
        </Button>
        </form>
        
    </>
}