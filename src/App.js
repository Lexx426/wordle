import Board from './components/Board';
import Keyboard from './components/Keyboard';
import './App.css';
import { boardDefault, generateWordSet } from './Words'; 
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);

  const [currentAttempt, setCurrentAttempt] = useState({attemptValue: 0, letterPosition: 0});
  const [wordSet,setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);

  const correctWord = "RIGHT";
  useEffect(() =>{
    generateWordSet().then((words) =>{
      setWordSet(words.wordSet);
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;
      const newBoard = [...board];
      newBoard[currentAttempt.attemptValue][currentAttempt.letterPosition] = keyValue;
      setBoard(newBoard);
      setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition + 1});
    
  }

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
      const newBoard = [...board];
      newBoard[currentAttempt.attemptValue][currentAttempt.letterPosition - 1] = "";
      setBoard(newBoard)
      setCurrentAttempt( {...currentAttempt, letterPosition: currentAttempt.letterPosition - 1})
  }

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for ( let i = 0; i < 5; i++){
      currentWord += board[currentAttempt.attemptValue][i].toLowerCase();
    }
    if (wordSet.has(currentWord.toLowerCase())){
      setCurrentAttempt({attemptValue: currentAttempt.attemptValue + 1, letterPosition: 0})
    } else {
      alert("Word not found.");
    }
    if ( currentWord.toLowerCase() === correctWord.toLowerCase()){
      alert("You guessed the right word!");
      console.log("yes")
    }
  }
      

  return (
    <div className="App">
      <nav> <h1> Wordle </h1></nav>
      <AppContext.Provider value={{board, setBoard, currentAttempt, setCurrentAttempt, onDelete, onEnter, onSelectLetter, correctWord, disabledLetters, setDisabledLetters}}>
        <div className='game'>
          <Board/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
