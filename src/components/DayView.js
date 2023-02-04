import React, {useEffect, useState} from 'react'
import TimeBlock from './TimeBlock';
import WorkBlock from './WorkBlock'

export default function DayView() {
    const objectiveAmount = 4;
    const screenCoveringAmount = objectiveAmount + 2; // show more than objects to cover for offscreen (default + 2 for empty card on top and bottom)
    const [height, setHeight] = useState(window.innerHeight/screenCoveringAmount * 1.3);

    const [blocks, setBlocks] = useState(createBlocks());
    const [worklogs, setWorklogs] = useState(createWorklogs()); // or get from local storage later

    


    function createBlocks(){
        let  blockArray = [];
        for(let slot = 0; slot < screenCoveringAmount; slot++) {
            blockArray.push({ title: (slot+1).toString().padStart(2, '0') + ":00", slot: slot});
        }
        return blockArray;
    }

    function createWorklogs(){
        let workLogs = [];
        for(let slot = 1; slot < objectiveAmount + 1; slot++) {
            workLogs.push({ title: "Find me @ Team '22!", slot: slot, isCollected: false});
        }
        return workLogs;
    }
   
    


    // Handles resize and variable changes
    function handleResize(){
        setHeight(window.innerHeight/screenCoveringAmount * 1.3);
    };

    useEffect(() => {
       window.addEventListener('resize', handleResize)
       return () => window.removeEventListener('resize', handleResize)
    }, []);
    
    useEffect(()=>{
        setBlocks(createBlocks());
        handleResize();
    }, [screenCoveringAmount, objectiveAmount]);


    return (
        <div id="dayview-container">
             {worklogs.map((value, i) => <WorkBlock title={value.title} slot={value.slot} height={height} isCollect={value.isCollected} key={i}/>)}
             {blocks.map((value, i) => <TimeBlock title={value.title} slot={value.slot} height={height} key={i}/>)}
        </div>
    )
} 