import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../dataContext';

export default function Scoreboard() {
    const {data, objectiveAmount, setInfoPanelOpen, setResultPanelOpen} = useContext(DataContext);
    const collected = data.filter(card => card.isCollected === true).length;
    const [complete, setCompleted] = useState(checkCompleted());

    useEffect(() => {
        setResultPanelOpen(complete);
    }, [complete]);

    function checkCompleted(){
        return collected === objectiveAmount;
    }

    useEffect(() => {
        setCompleted(checkCompleted());
    }, [collected]);

    return (
        <>
            <div id ="scoreboard-container">
            ✦&ensp;{collected} of {objectiveAmount}
            <div id="info" onClick={()=>setInfoPanelOpen(true)}>?</div>
            </div>
            {complete && <div id="complete-btn" onClick={()=>{setResultPanelOpen(true)}}>✦ Click me! ✦</div>}
        </>
    );
    
}