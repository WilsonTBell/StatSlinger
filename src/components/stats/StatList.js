import { useState, useEffect } from "react"
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem, List } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./StatList.css";

export const StatList = () => {
    const [matches, setMatches] = useState([])
    const [completedMatches, setCompleted] = useState([])
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
      open === id ? setOpen() : setOpen(id);
    };

    const localStatSlinger = localStorage.getItem("stat_slinger")
    const  StatSlingerObject = JSON.parse(localStatSlinger)

    useEffect(
        () => {
            fetch(`http://localhost:8088/matches?_embed=stages&_embed=stats`)
            .then(response => response.json())
            .then((matchesArray) => {
                setMatches(matchesArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/completedMatches`)
            .then(response => response.json())
            .then((completedMatchesArray) => {
                setCompleted(completedMatchesArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
    <h1>My Stats</h1>
    <UncontrolledAccordion
  defaultOpen={[
    '1',
    '2'
  ]}
  stayOpen
>
        {completedMatches.map((completedMatch)=> {
                return<>
                {matches.map(
                        (match) => {if(completedMatch.matchId === match.id && completedMatch.shooterId === StatSlingerObject.id)
                            return <AccordionItem>
                                        <AccordionHeader targetId={`match--${match.id}`}>
                                            Match on {match.date}
                                        </AccordionHeader>
                                            <AccordionBody accordionId={`match--${match.id}`}>
                                                {match.stages.map((stage)=> {
                                                        return <AccordionItem>
                                                            <AccordionHeader targetId={`stage--${stage.id}`}>
                                                                Stage {stage.id}
                                                            </AccordionHeader>
                                                            <AccordionBody accordionId={`stage--${stage.id}`}>
                                                                {match.stats.map((stat) => {
                                                                    if(stat.stageId === stage.id && stat.shooterId === StatSlingerObject.id) 
                                                                    return <>
                                                                        <List>
                                                                            <li key="revolverStats">
                                                                                Misses With Revolvers: {stat.pistolMisses}
                                                                            </li>
                                                                            <li key="rifleStats">
                                                                                Misses With Rifle: {stat.rifleMisses}
                                                                            </li>
                                                                            <li key="shotgunStats">
                                                                                Misses With Shotgun: {stat.shotgunMisses}
                                                                            </li>
                                                                            <li key="proceduralStats">
                                                                                Procedural: {stat.procedural ? "🧨" : "No"}
                                                                            </li>
                                                                            <li key="rawTimeStats">
                                                                                Raw Time: {stat.rawTime}
                                                                            </li>
                                                                            <li key="modifiedTimeStats">
                                                                                Modified Time: {stat.modifiedTime}
                                                                            </li>
                                                                            <li key="notesStats">
                                                                                Notes: {stat.notes}
                                                                            </li>
                                                                        </List>
                                                                    </>
                                                                })}
                                                            </AccordionBody>
                                                        </AccordionItem>
                                                    }
                                                )
                                            }
                                        </AccordionBody>
                                    </AccordionItem>
                                }
                            )
                        }
                    </>
                }
            )
         }
        </UncontrolledAccordion>
    </>
}