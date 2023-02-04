import React, { useEffect, useState, useContext } from "react";
import {Html5Qrcode } from "html5-qrcode"
import { DataContext } from "../dataContext";

export default function QrScanner(){
    const [html5QrCode, setHtml5QrCode] = useState(undefined);
    const {qrPopupOpen, setQrPopupOpen} = useContext(DataContext);

    function scanSuccess(decodedText, decodedResult){
        console.log(decodedText, decodedResult);
        setQrPopupOpen(false);
    }

    function qrStart(){
        let newQr = new Html5Qrcode(/* element id */ "reader");

        newQr.start(
            { facingMode: "environment" },
            {
                fps: 10,    // Optional, frame per seconds for qr code scanning
                aspectRatio: 1,
            },
            scanSuccess
        );

        setHtml5QrCode(newQr);
    }

    useEffect(()=>{
        try {
            if(qrPopupOpen){
                qrStart();
            } else {
                if(!html5QrCode){return};
                html5QrCode.stop();
            }
        } catch (error) {
            console.log(error);
        }
       
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