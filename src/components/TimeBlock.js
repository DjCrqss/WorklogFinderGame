import React from 'react'
export default function TimeBlock({title, slot, height}) {
    return (
    <div className="time-block" style={{top: height*slot, height:  height}}>
        {title}
    </div>)
}