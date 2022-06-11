import React from 'react'
import "./Letter.css";

function Letter({letter}) {
    
  return (
   <button className="cell">{letter}</button>
  )
}

export default Letter