import React, {useState, useEffect, createContext} from 'react';
import confetti from 'canvas-confetti';

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    // Custom variables
    const objectiveAmount = 4; // up to 8 looks best
    const screenCoveringAmount = objectiveAmount + 2;
    const templates = ["Waited for Jira instance to start up", "Had a good snack", "Wrote some code with help from Stack Overflow", "Designed a mini game for people to play", "Chatted to app vendors", "Wasted company time"];
    const [data, setData] = useState(loadSavedData());
    const scale = 1.4;
   


    // Environment variables
    const [qrPopupOpen, setQrPopupOpen] = useState(false);
    const [infoPanelOpen, setInfoPanelOpen] = useState(checkFirstLoad());
    const [resultPanelOpen, setResultPanelOpen] = useState(false);
    const [height, setHeight] = useState(window.innerHeight/screenCoveringAmount * scale);


   

    // Startup functions
    useEffect(() => {
        qrDecryptAndSave(window.location);
       window.addEventListener('resize', handleResize)
       return () => window.removeEventListener('resize', handleResize)
    }, []);

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
                localStorage.removeItem("data");
            }
            
        }

        return cards;
    }

    // generate initial data
    function createInitialData(){
        console.log("Initial data created");
        const cards = [];
        for(let slot = 1; slot < objectiveAmount +1; slot++) {
            let title = "You found me!";
            if(slot -1 < templates.length){
                title = templates[slot - 1];
            }
            
            cards.push({ lockedTitle: createHiddenTitle(title), unlockedTitle: title, slot: slot, isCollected: false});
        }
        return cards;
    }

    function createHiddenTitle(title){
        return title.replace(/\S/g,'#');  // █ ▒ 
    }

    function qrDecryptAndSave(link){
        let newData = [...data];

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
            if(localStorage.getItem("data") !== null){
                localStorage.removeItem("data");
            }
            setData(createInitialData());
        }
        else if(!isNaN(result)){
            let num = +result;
            num /= ssc;
            if(num <= 0 || num > data.length || !Number.isInteger(num)){
                return false;
            }
            if(newData[num - 1].isCollected === false){
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors : ['#fcba03', '#fca103', '#ebf263', '#ffd996', '#fff5c2']
                });
            }
            newData[num - 1].isCollected = true;
        } else {
            return false;
        }
        // get decoded text and check if it is a number to set to true
        setData(newData);

        // save data
        console.log("Data saved with new entry from", result);
        localStorage.setItem("data", JSON.stringify(data));

        return true;
    }

    // Handles resize and variable changes
    function handleResize(){
        setHeight(window.innerHeight/screenCoveringAmount * scale);
    };
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
        resultPanelOpen,
        setQrPopupOpen,
        setData,
        setInfoPanelOpen,
        setResultPanelOpen,
        qrDecryptAndSave
    }

    const ssc = 423;
    return <DataContext.Provider value={dataContextStore}>{props.children}</DataContext.Provider>
}
