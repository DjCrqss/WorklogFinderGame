import React, {useContext} from 'react'
import { DataContext } from '../dataContext';

export default function Scoreboard() {
    const {data, objectiveAmount, setInfoPanelOpen} = useContext(DataContext);
    let collected = data.filter(card => card.isCollected === true).length;

    return (
        <div id ="scoreboard-container">
           ✦&ensp;{collected} of {objectiveAmount}
           <div id="info" onClick={()=>setInfoPanelOpen(true)}>?</div>
        </div>
    );
    
}