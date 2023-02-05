import React, {useEffect, useState, useContext} from 'react'
import TimeBlock from './TimeBlock';
import WorkBlock from './WorkBlock'
import { DataContext } from "../dataContext";

export default function DayView() {
    const {screenCoveringAmount, height, data} = useContext(DataContext);
    const [blocks, setBlocks] = useState(createBlocks());

    function createBlocks(){
        let  blockArray = [];
        for(let slot = 0; slot < screenCoveringAmount + 1; slot++) {
            blockArray.push({ title: (slot+1).toString().padStart(2, '0') + ":00", slot: slot});
        }
        return blockArray;
    }

    useEffect(()=>{
        setBlocks(createBlocks());
    }, [screenCoveringAmount]);

    return (
        <div id="dayview-container">
             {data.map((value, i) => <WorkBlock lockedTitle={value.lockedTitle} unlockedTitle={value.unlockedTitle} slot={value.slot} height={height} isCollected={value.isCollected} key={i}/>)}
             {blocks.map((value, i) => <TimeBlock title={value.title} slot={value.slot} height={height} key={i}/>)}
        </div>
    )
} 