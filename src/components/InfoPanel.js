import React, {useContext} from "react";
import { DataContext } from '../dataContext';

export default function InfoPanel() {
    const {infoPanelOpen, setInfoPanelOpen} = useContext(DataContext);

    return (
        <>
            <div className="fullscreen-panel-backdrop" style={{opacity: infoPanelOpen ? '1' : '0'  , pointerEvents: infoPanelOpen ? 'all' : 'none' }} onClick={()=>{setInfoPanelOpen(false)}}></div>
            <div className="fullscreen-panel" style={{opacity: infoPanelOpen ? '1' : '0'  , pointerEvents: infoPanelOpen ? 'all' : 'none' }}>
                <h1>EasyTime Sheeter</h1>
                <div>
                    <p>Welcome to Time Sheeter by TechTime.</p>
                    <p>For this treasure hunting game, search for QR codes sneakily hidden around the building and earn a reward.</p>
                    <p>Scan the QR codes with your phone (using the button at the bottom left) and head to the TechTime stall to collect your prize!</p>
                    <br></br>
                    <p>If you get a little stuck, don't be scared to ask for help! Our stellar support is available here too ;)</p>
                </div>
                <h3>Good luck and have fun!</h3>
                <div id="close-button" onClick={()=>{setInfoPanelOpen(false)}}>✖</div>
            </div>
        </>
    );
}