import React, { useEffect, useState } from "react";
import {Html5Qrcode } from "html5-qrcode"

export default function QrScanner({active, setActive}){
    const [html5QrCode, setHtml5QrCode] = useState(undefined);

    function scanSuccess(decodedText, decodedResult){
        console.log(decodedText, decodedResult);
        setActive(false);
    }

    function qrStart(){
        let newQr = new Html5Qrcode(/* element id */ "reader");
        
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
              var cameraId = devices[0].id;
              newQr.start(cameraId, 
                {
                  fps: 10,    // Optional, frame per seconds for qr code scanning
                  aspectRatio: 1,
                },
                scanSuccess);
            }
          }).catch(err => {
            // handle err
          });

          setHtml5QrCode(newQr);
    }

    useEffect(()=>{
        try {
            if(active){
                qrStart();
            } else {
                if(!html5QrCode){return};
                html5QrCode.stop();
            }
        } catch (error) {
            console.log(error);
        }
       
    }, [active])

    

    

    return (
        <>
            <div className="popupBackdrop" onClick={()=>{setActive(false)}} style={{opacity: active ? '1' : '0'  , pointerEvents: active ? 'all' : 'none' }}></div>
            <div className="popupDrawer" style={{bottom: active? '0' : '-75vmax'}}>
                <div id="reader" style={{width: '80%'}}>Camera loading or permissions not given.</div>
            </div>
        </>
       
    )
}