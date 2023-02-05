import React from 'react'
export default function WorkBlock({lockedTitle, unlockedTitle, slot, height, isCollected}) {
    const classStyle = isCollected? "work-block-unlocked" : "work-block-locked";
    return (
        <div className ="work-block-container" style={{top: height*slot, height:  height}}>
            <div className={"work-block " + classStyle}>
                {isCollected? unlockedTitle : lockedTitle}
                <span className='work-block-interval'>15m</span>
            </div>
        </div>
    );
    
}