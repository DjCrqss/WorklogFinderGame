// import logo from './logo.svg';
import './App.css';
import QrScanner from './components/QrScanner';
import DayView from './components/DayView';
import React, {useState} from 'react';

function App() {
  const [qrPopupOpen, setQrPopupOpen] = useState(false);



  return (
    <div className="App">
      
        
      <QrScanner active={qrPopupOpen} setActive={setQrPopupOpen}/>
      <DayView />
      <div id="qr-fab" onClick={()=>{setQrPopupOpen(!qrPopupOpen)}}>Scan QR codes</div>
        
    </div>
  );
}

export default App;
