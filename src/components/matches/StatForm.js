import { useState } from "react"
import { Button } from "reactstrap";

export const StatForm = ({matchId, stageId, paramFunction}) => {
    const [stat, update] = useState({
      shooterId: "",
      matchId: "",
      stageId: "",
      pistolMisses: "",
      rifleMisses: "",
      shotgunMisses: "",
      procedural: false,
      rawTime: "",
      modifiedTime: "",
      notes: ""
    })

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

const handleSubmitButtonClick = () => {
       


        const statToSendToAPI = {
            shooterId: StatSlingerObject.id,
            matchId: parseInt(matchId),
            stageId: stageId,
            pistolMisses: parseInt(stat.pistolMisses),
            rifleMisses: parseInt(stat.rifleMisses),
            shotgunMisses: parseInt(stat.shotgunMisses),
            procedural: false,
            rawTime: parseFloat(stat.rawTime),
            modifiedTime: parseFloat(stat.modifiedTime),
            notes: stat.notes
        }

        return fetch(`http://localhost:8088/stats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(statToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
               paramFunction()
            })
    }


    return <>
    <form className="statForm">
        <fieldset>
                <div className="form-group">
                    <label htmlFor="pistolMisses">Pistol Misses:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="number of misses"
                        value={stat.pistolMisses}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.pistolMisses = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rifleMisses">Rifle Misses:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="number of misses"
                        value={stat.rifleMisses}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.rifleMisses = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="shotgunMisses">Shotgun Misses:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="number of misses"
                        value={stat.shotgunMisses}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.shotgunMisses = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rawTime">Raw Time:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter your time with no penalties"
                        value={stat.rawTime}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.rawTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="modifiedTime">Modified Time:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter your time with penalties"
                        value={stat.modifiedTime}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.modifiedTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="modifiedTime">Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter any notes on where you need to improve or issues with the stage"
                        value={stat.notes}
                        onChange={
                            (evt) => {
                                const copy = {...stat}
                                copy.notes = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
    </form>
    <Button color='light' outline onClick={() => {handleSubmitButtonClick()}}>Submit Stats</Button>{' '}
    </>


}