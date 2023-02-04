// import logo from './logo.svg';
import './App.css';
import QrScanner from './components/QrScanner';
import DayView from './components/DayView';
import React, {useContext} from 'react';
import { DataContext } from './dataContext';


function App() {
  const {qrPopupOpen, setQrPopupOpen} = useContext(DataContext);



  return (
    <div className="App">
   
          {/* Content */}
          <QrScanner />
          <DayView />

          {/* Buttons */}
          <div id="qr-fab" onClick={()=>{setQrPopupOpen(!qrPopupOpen)}}>Scan QR codes</div>
    
    </div>
  );
}

export default App;
