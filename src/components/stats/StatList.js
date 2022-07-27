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
    <UncontrolledAccordion key={`accordionParent`}
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
                            return <AccordionItem key={`matchAccordion--${match.id}`}>
                                        <AccordionHeader key={`matchAccordionHeader--${match.id}`} targetId={`match--${match.id}`}>
                                            Match on {match.date}
                                        </AccordionHeader>
                                            <AccordionBody key={`matchAccordionBody--${match.id}`} accordionId={`match--${match.id}`}>
                                                {match.stages.map((stage)=> {
                                                        return <AccordionItem key={`stageAccordion--${stage.id}`}>
                                                            <AccordionHeader key={`stageAccordionHeader--${stage.id}`} targetId={`stage--${stage.id}`}>
                                                                {stage.name}
                                                            </AccordionHeader>
                                                            <AccordionBody key={`stageAccordionBody--${stage.id}`} accordionId={`stage--${stage.id}`}>
                                                                {match.stats.map((stat) => {
                                                                    if(stat.stageId === stage.id && stat.shooterId === StatSlingerObject.id) 
                                                                    return <>
                                                                        <List key={`statList--${stat.id}`}>
                                                                            <li key={`revolverStats--${stat.id}`}>
                                                                                Misses With Revolvers: {stat.pistolMisses}
                                                                            </li>
                                                                            <li key={`rifleStats--${stat.id}`}>
                                                                                Misses With Rifle: {stat.rifleMisses}
                                                                            </li>
                                                                            <li key={`shotgunStats--${stat.id}`}>
                                                                                Misses With Shotgun: {stat.shotgunMisses}
                                                                            </li>
                                                                            <li key={`proceduralStats--${stat.id}`}>
                                                                                Procedural: {stat.procedural ? "🧨" : "No"}
                                                                            </li>
                                                                            <li key={`rawTimeStats--${stat.id}`}>
                                                                                Raw Time: {stat.rawTime}
                                                                            </li>
                                                                            <li key={`modifiedTimeStats--${stat.id}`}>
                                                                                Modified Time: {stat.modifiedTime}
                                                                            </li>
                                                                            <li key={`notesStats--${stat.id}`}>
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