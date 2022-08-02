import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

export const GunForm = () => {
    const navigate = useNavigate()
    const [types, setTypes] = useState([])
    const [gun, update] = useState({
        name: '',
        typeId: 0,
        description: '',
        shooterId: 0
    })

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
            .then(response => response.json())
            .then((typesArray) => {
                setTypes(typesArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    const handlePostButtonClick = () => {
        
        const gunToSendToAPI = {
            name: gun.name,
            typeId: gun.typeId,
            description: gun.description,
            shooterId: parseInt(StatSlingerObject.id)
        }

        return fetch(`http://localhost:8088/guns`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gunToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
               navigate(`/guns`)
            })
    }


    return <>
    <form className="gunForm">
        <fieldset>
                <div className="form-group">
                    <label htmlFor="gunName">Gun Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The Name of Your Gun, Get Creative!"
                        value={gun.name}
                        onChange={
                            (evt) => {
                                const copy = {...gun}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="gunDescription">Gun Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Any information you may need on your gun, modifications, caliber, et cetera."
                        value={gun.description}
                        onChange={
                            (evt) => {
                                const copy = {...gun}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
        </fieldset>
        <fieldset>
                <div>
                    <Dropdown
                    label="Gun Type"
                    options={types}
                    onChange={ (evt) => {
                        const copy = {...gun}
                        copy.typeId = parseInt(evt.target.value)
                        update(copy)
                    }}
                    />
                </div>
            </fieldset>
        <Button color="light" outline onClick={() => handlePostButtonClick()}>
                Add Gun To Collection
        </Button>
        </form>
        
    </>
}

const Dropdown = ({ label, options, onChange }) => {
    return (
      <label>
        {label}
        <select  onChange={(evt) => onChange(evt)}>
            <option value={0}>Type</option>
          {options.map((option) => (
            <option value={option.id}>{option.name}</option>
          ))}
        </select>
      </label>
    );
  };