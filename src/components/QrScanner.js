import React, { useEffect, useState, useContext } from "react";
import {Html5Qrcode } from "html5-qrcode"
import { DataContext } from "../dataContext";
import confetti from 'canvas-confetti';

export default function QrScanner(){
    const [html5QrCode, setHtml5QrCode] = useState(undefined);
    const {qrPopupOpen, setQrPopupOpen, data, setData} = useContext(DataContext);

    function scanSuccess(decodedText, decodedResult){
        setQrPopupOpen(false);
        window?.navigator?.vibrate?.(100);

        let newData = data;
        // get decoded text and check if it is reset_all and if so reset all data
        if(decodedText === "reset_all"){
            newData.forEach((value) => {value.isCollected = false});
        }
        else if(!isNaN(decodedText) && +decodedText > 0 && +decodedText <= data.length){
            newData[+decodedText - 1].isCollected = true;
        } else {
            return;
        }
        // get decoded text and check if it is a number to set to true
        setData(newData);

        // save data
        console.log("Data saved");
        localStorage.setItem("data", JSON.stringify(data));

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 },
            colors : ['#fcba03', '#fca103', '#ebf263', '#ffd996', '#fff5c2']
          });
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