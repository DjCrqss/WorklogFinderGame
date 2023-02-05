// import logo from './logo.svg';
import './App.css';
import QrScanner from './components/QrScanner';
import DayView from './components/DayView';
import Scoreboard from './components/Scoreboard';
import React, {useContext} from 'react';
import InfoPanel from './components/InfoPanel';
import ResultPanel from './components/ResultPanel';
import { DataContext } from './dataContext';


function App() {
  const {qrPopupOpen, setQrPopupOpen} = useContext(DataContext);



  return (
    <div className="App">
          {/* Main popup panels */}
          <InfoPanel />
          <ResultPanel />

          {/* Score and info popup */}
          <Scoreboard />
   
          {/* Content */}
          <QrScanner />
          <DayView />

          {/* Buttons */}
          <div id="qr-fab" onClick={()=>{setQrPopupOpen(!qrPopupOpen)}}>✪&ensp;Scan QR</div>
    
    </div>
  );
}

export default App;
