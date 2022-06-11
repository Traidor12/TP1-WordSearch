import React from 'react'
import { Letter } from '..'
import './Board.css'
function Board({selectedLevel, letters}) {
  const gameClass =
  selectedLevel === "1"
    ? ""
    : selectedLevel === "2"
    ? "intermedio"
    : "avancado";
  return (
    <section className="margin">
      <div id="WS" className = {gameClass}>
      {letters.map((letter) => (
          <Letter key={letter.key} letter={letter} />
        ))}
      </div>
    </section>
  )
}

export default Board
