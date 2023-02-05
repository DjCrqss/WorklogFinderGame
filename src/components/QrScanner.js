import React, { useEffect, useState, useContext } from "react";
import {Html5Qrcode } from "html5-qrcode"
import { DataContext } from "../dataContext";


export default function QrScanner(){
    const [html5QrCode, setHtml5QrCode] = useState(undefined);
    const {qrPopupOpen, setQrPopupOpen, qrDecryptAndSave} = useContext(DataContext);

    function scanSuccess(decodedText, decodedResult){
        window?.navigator?.vibrate?.(100);
        if(qrDecryptAndSave(decodedText)){
            setQrPopupOpen(false);
        } 
    }

    // Turn on scanner
    function qrStart(){
        let newQr = new Html5Qrcode(/* element id */ "reader");
        newQr.start(
            { facingMode: "environment" },
            {fps: 10, aspectRatio: 1},
            scanSuccess
        );
        setHtml5QrCode(newQr);
    }
    // Disable QR access when popup is closed
    useEffect(()=>{
        try {
            if(qrPopupOpen){
                qrStart();
            } else {
                if(!html5QrCode){return};
                html5QrCode.stop();
            }
        } catch (error){console.log(error); }
    }, [qrPopupOpen])

    return (
        <>
            <div className="popupBackdrop" onClick={()=>{setQrPopupOpen(false)}} style={{opacity: qrPopupOpen ? '1' : '0'  , pointerEvents: qrPopupOpen ? 'all' : 'none' }}></div>
            <div className="popupDrawer" style={{bottom: qrPopupOpen? '0' : '-75vmax'}}>
                <div id="reader" style={{width: 'calc(100% - 1em)'}}>Camera loading or permissions not given.</div>
            </div>
        </>
       
    )
}