import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import './App.css';
import { words } from './constants';
import { Letters } from './constants';
import { shuffleArray } from './helpers';

import {ControlPanel,Board,Header,Footer} from "./components"

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',"A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',"A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',"A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const possiblewords = ['JAVASCRIPT', 'COIMBRA', 'PORTUGAL', 'BANANA', 'LISBOA', 'CSS', 'UNIVERSIDADE', 'ISEC', 'POLITICA'];
let timeout = 120;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [letters, setLetters] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("0");

  let timerId= undefined;

  const handleGameStart = () => {
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
    } else {
      console.log("Inicia Jogo");
      setGameStarted(true);
    }
  };
  

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);

    let numOfLett = 100;
    let numOfWords;
    switch (value) {
      // Level: Beginner
      case '1':
        numOfLett = 80;
        numOfWords = 3;
        break;
      // Level: Intermediate
      case '2':
        numOfLett = 100;
        numOfWords = 5;
        break;
      // Level: Advanced
      case '3':
        numOfLett = 120;
        numOfWords = 7;
        break;
      default:
        numOfLett = 0;
        numOfWords = 0;
        break;
    }
    
    

    const initialLetters = shuffleArray(alphabet);
    const slicedInitialLetters= initialLetters.slice(0, numOfLett);
    setLetters([...slicedInitialLetters]);

    const initialWords = shuffleArray(possiblewords);
    const slicedInitialWords= initialWords.slice(0, numOfWords);
    setWords([...slicedInitialWords]);
  }

  const [timer, setTimer] = useState(timeout);

  useEffect(() => {
    if (gameStarted) {
      timerId = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          setGameStarted(false);

        }
      }, 1000);
    } else if (timer !== timeout) {
      setTimer(timeout);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  return (
    <div id="container">
      <div className="texto" >
        <Header/>
        <ControlPanel
        gameStarted={gameStarted}
        onGameStart={handleGameStart}
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        words = {words}
        timer={timer}/>
        <Footer/>
        </div>
        <div className="Jogo">
        <Board
        letters = {letters}
        selectedLevel={selectedLevel}
        words = {words}/>
        </div>
      
      
    </div>
  ); 
}


export default App;
