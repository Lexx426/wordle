import Board from './components/Board';
import Keyboard from './components/Keyboard';
import './App.css';
import { boardDefault, generateWordSet } from './Words'; 
import { createContext, useEffect, useState } from 'react';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);

  const [currentAttempt, setCurrentAttempt] = useState({attemptValue: 0, letterPosition: 0});
  const [wordSet,setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] =useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("")


  useEffect(() =>{
    generateWordSet().then((words) =>{
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
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

    // console.log(wordSet + "apapapapapa")
    // console.log(todaysWord + " asasasasasas")
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
      setGameOver ({gameOver: true, guessedWord: true})
      return;
    }
    if (currentAttempt.attemptValue === 5){
      setGameOver( {gameOver: true, guessedWord: false})
      return;
    }
  }
      

  return (
    <div className="App">
      <nav> <h1> Wordle </h1></nav>
      <AppContext.Provider value={{board, setBoard, currentAttempt, setCurrentAttempt, onDelete, onEnter, onSelectLetter, correctWord, disabledLetters, setDisabledLetters, gameOver,setGameOver}}>
        <div className='game'>
          <Board/>
          { gameOver.gameOver ? <GameOver /> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
