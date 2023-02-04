import React from 'react'
export default function TimeBlock({title, slot, height}) {
    return (
        <div className ="work-block-container" style={{top: height*slot, height:  height}}>
            <div className="work-block">
                {title}
            </div>
        </div>
    );
    
}