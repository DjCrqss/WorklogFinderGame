import React, {useState, useEffect, createContext} from 'react';
import confetti from 'canvas-confetti';

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    // Custom variables
    const objectiveAmount = 4; // up to 8 looks best
    const screenCoveringAmount = objectiveAmount + 2;
    const [data, setData] = useState(loadSavedData());
    qrDecryptAndSave(window.location.search);
    const scale = 1.4;


    // Environment variables
    const [qrPopupOpen, setQrPopupOpen] = useState(false);
    const [infoPanelOpen, setInfoPanelOpen] = useState(checkFirstLoad());
    const [ResultPanelOpen, setResultPanelOpen] = useState(false);
    const [height, setHeight] = useState(window.innerHeight/screenCoveringAmount * scale);


    function qrDecryptAndSave(link){
        let newData = data;

        // allow both URL input and direct code input
        let code;
        try {
            const url = new URL(link);
            const args =  new URLSearchParams(url.search);
            code = args.get("code");
        } catch (error) {}
        let result = code || link;
        
        if(result === "reset_all"){
            newData.forEach((value) => {value.isCollected = false});
        }
        else if(!isNaN(result) && +result > 0 && +result <= data.length){
            newData[+result - 1].isCollected = true;
        } else {
            return false;
        }
        // get decoded text and check if it is a number to set to true
        setData(newData);

        // save data
        console.log("Data saved with new entry from", result);
        localStorage.setItem("data", JSON.stringify(data));

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 },
            colors : ['#fcba03', '#fca103', '#ebf263', '#ffd996', '#fff5c2']
          });

        return true;
    }



    // Checks if this is the first time the user opens the app
    function checkFirstLoad(){
        let firstLoad = localStorage.getItem("firstLoad");
        if(firstLoad === null){
            localStorage.setItem("firstLoad", "false");
            return true;
        }
        return false;
    }

    // Functions
    function loadSavedData(){
        let cards = [];
        let savedData = localStorage.getItem("data");
        // load data from local storage
        if(savedData === null){
            cards = createInitialData();
        } else {
            console.log("Data retrieved");
            cards = JSON.parse(savedData);
            if(cards.length !== objectiveAmount){
                console.log("Data is not up to date");
                cards = createInitialData();
            }
            
        }

        return cards;
    }

    // generate initial data
    function createInitialData(){
        console.log("Initial data created");
        const cards = [];
        for(let slot = 1; slot < objectiveAmount +1; slot++) {
            cards.push({ lockedTitle: "Find me @ Team '23", unlockedTitle: "You found me!", slot: slot, isCollected: false});
        }
        return cards;
    }


    // Handles resize and variable changes
    function handleResize(){
        setHeight(window.innerHeight/screenCoveringAmount * scale);
    };
    useEffect(() => {
       window.addEventListener('resize', handleResize)
       return () => window.removeEventListener('resize', handleResize)
    }, []);
    useEffect(()=>{
        // setBlocks(createBlocks());
        handleResize();
    }, [screenCoveringAmount, objectiveAmount]);


    const dataContextStore = {
        objectiveAmount,
        screenCoveringAmount,
        height,
        qrPopupOpen,
        data,
        infoPanelOpen,
        ResultPanelOpen,
        setQrPopupOpen,
        setData,
        setInfoPanelOpen,
        setResultPanelOpen,
        qrDecryptAndSave
    }

    return <DataContext.Provider value={dataContextStore}>{props.children}</DataContext.Provider>

}
