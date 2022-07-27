import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './MatchList.css';
import { Match } from "./Match";

export const MatchList = () => {
    const [matches, setMatches] = useState([])
    const [filteredMatches, setFiltered] = useState([])
    const [completedMatches, setCompleted] = useState([])

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    const getCompletedMatches = () => {

        fetch(`http://localhost:8088/completedMatches?shooterId=${StatSlingerObject.id}`)
            .then(response => response.json())
            .then((matchesArray) => {
                setCompleted(matchesArray)
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/matches`)
            .then(response => response.json())
            .then((matchesArray) => {
                setMatches(matchesArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            getCompletedMatches()
        },
        []
    )

    useEffect(
        () => {
            const incompleteMatches = []
            for (const match of matches) {
                let matchIndicator = false
                for (const completedMatch of completedMatches) {
                            if(completedMatch.matchId === match.id){
                                matchIndicator = true
                            }
                        }
                    if(matchIndicator === false){incompleteMatches.push(match)}
                }
            setFiltered(incompleteMatches)
        },
        [matches, completedMatches]
    )

    const handleComplete = (id) => {
       
        const completedMatchToSendToAPI = {
            matchId: id,
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
                getCompletedMatches()
            })
    }


    return <>
    <article className="matchCards">
    {filteredMatches.map(match=> <Match
        key={`match--${match.id}`}
        id={match.id}
        image={match.image}
        name={match.name}
        date={match.date}
        evtFunction={handleComplete}
        />
        )
    }
    </article>
    </>
}