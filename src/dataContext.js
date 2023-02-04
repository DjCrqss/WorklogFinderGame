import React, {useState, useEffect, createContext} from 'react';

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    // Custom variables
    const objectiveAmount = 4; // up to 8 looks best
    const screenCoveringAmount = objectiveAmount + 2;
    const [data, setData] = useState(loadSavedData());

    const scale = 1.4;


    // Environment variables
    const [qrPopupOpen, setQrPopupOpen] = useState(false);
    const [height, setHeight] = useState(window.innerHeight/screenCoveringAmount * scale);


    // Functions
    // load data from local storage
    function loadSavedData(){
        let savedData = localStorage.getItem("data");
        if(savedData === null){
            return createInitialData();
        } else {
            console.log("Data retrieved");
            let cards = JSON.parse(savedData);
            if(cards.length !== objectiveAmount){
                console.log("Data is not up to date");
                return createInitialData();
            }
            return cards;
        }
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
        setQrPopupOpen,
        setData,
    }

    return <DataContext.Provider value={dataContextStore}>{props.children}</DataContext.Provider>

}
