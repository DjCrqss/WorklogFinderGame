import React, {useContext} from "react";
import { DataContext } from '../dataContext';

export default function ResultPanel() {
    const {resultPanelOpen, setResultPanelOpen, objectiveAmount} = useContext(DataContext);
    return (
        <>
            <div className="fullscreen-panel-backdrop" style={{opacity: resultPanelOpen ? '1' : '0'  , pointerEvents: resultPanelOpen ? 'all' : 'none' }} onClick={()=>{setResultPanelOpen(false)}}></div>
            <div className="fullscreen-panel" style={{opacity: resultPanelOpen ? '1' : '0'  , pointerEvents: resultPanelOpen ? 'all' : 'none', alignItems: 'center' }}>
            <h1>CONGRATS!</h1>
            <div>
                <p>You found all the worklogs!</p>
                <p>With 'EasyTime' you saved {objectiveAmount*15} minutes by having it automatically record your time while you were on the hunt ;)</p>
                <p>Now come back to TechTime's stall and collect your reward! You deserve it.</p>
                <br></br>
                <p>Have we piqued your interest yet? We would love you to check out EasyTime itself and see if it suits you.</p>
            </div>
            <a id="easytime-button" href="https://techtime.co.nz/display/TECHTIME/EasyTime" target="_blank">Visit EasyTime!</a>
            <div id="close-button" onClick={()=>{setResultPanelOpen(false)}}>✖</div>
        </div>
        </>
        
            
        
    );
}