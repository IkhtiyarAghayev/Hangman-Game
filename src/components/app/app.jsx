import { useEffect, useState } from 'react';
import './app.css';
import Buttons from './buttons';
import wordList from './word-list';


function App() {
  const [currentWord, setCurrentWord] = useState('word');
  const [hint, setHint] = useState('');
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [maxGuess, setMaxGuesses] = useState(null);
  const [gussedLetters, setGuessedLetters] = useState([]);
  const [imgOrder, setImgOrder] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [finalScreen, setFinalScreen] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [gif, setGif] = useState('lost');
  const [disable, setDisable] = useState('');
  useEffect(() => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    setIsOver(false);
    setDisable('');
    setCurrentWord(word);
    setHint(hint);
    setFinalScreen('');
  }, [isOver])

  function checkLetter(clickedLetter) {
    if (currentWord.includes(clickedLetter.toLowerCase())) {
      const containedLetter = currentWord.split('').filter(letter => letter === clickedLetter.toLowerCase());
      setGuessedLetters([...gussedLetters, ...containedLetter])
    }
    else {
      setWrongGuessCount(w => wrongGuessCount + 1);
    }
  }
  function setDisabledbtn(btn) {
    btn.disabled = true;
  }
  useEffect(() => {
    switch (true) {
      case currentWord.length <= 4:
        setMaxGuesses(3);
        break;
      case currentWord.length <= 5:
        setMaxGuesses(4);
        break;
      case currentWord.length <= 6:
        setMaxGuesses(5);
        break;
      default:
        setMaxGuesses(6);
        break;
    }
  }, [currentWord])
  useEffect(() => {
    let pattern;
    if (wrongGuessCount !== 0) {
      if (maxGuess === 3) {
        setImgOrder(i => imgOrder + 2);
      }
      if (maxGuess === 4) {
        pattern = [1, 2, 0, 1, 2];
        setImgOrder(i => imgOrder + pattern[imgOrder]);
      }
      if (maxGuess === 5) {
        pattern = [1, 1, 2, 0, 1, 1]
        setImgOrder(i => imgOrder + pattern[imgOrder]);
      }
      if (maxGuess > 5) {
        setImgOrder(i => imgOrder + 1);
      }
    }

  }, [wrongGuessCount])

  useEffect(() => {
    if (wrongGuessCount === maxGuess) {
      setGif('lost');
      setGameStatus('Game Over!');
      setStatusText('The correct word was: ');
      setFinalScreen('show');
    }
  }, [wrongGuessCount])

  useEffect(() => {
    if (currentWord.length === gussedLetters.length) {
      setGif('victory');
      setGameStatus('Congrats!');
      setStatusText('You found the word: ');
      setFinalScreen('show');
    }
  }, [gussedLetters])
  function reset() {
    setCurrentWord('word');
    setHint('');
    setWrongGuessCount(0);
    setMaxGuesses(null);
    setGuessedLetters([]);
    setImgOrder(0)
    setFinalScreen('');
    setGameStatus('')
    setStatusText('');
    setGif('lost');
    setIsOver(true);
    setDisable(false);
  }

  return (
    <div className="App">
      <div className={`game-modal ${finalScreen}`}>
        <div className='content'>
          <img src={require(`../../assets/images/${gif}.gif`)} />
          <h4>{gameStatus}</h4>
          <p>{statusText}<b>{currentWord}</b></p>
          <button onClick={reset} className="play-again">Play Again</button>
        </div>
      </div>

      <div className="container">
        <div className="hangman-box">
          <img src={require(`../../assets/images/hangman-${imgOrder}.svg`)} alt="hangman-img" />
          <h1>Hangman Game</h1>
        </div>
        <div className="game-box">
          <ul className="word-display">
            {
              currentWord.split('').map((letter, index) => {
                if (gussedLetters.includes(letter)) {
                  return <li key={index} className='letter guessed'>{letter}</li>
                }
                else {
                  return <li key={index} className="letter"></li>
                }

              })
            }
          </ul>
          <h4 className="hint-text">
            Hint:
            <b>{' ' + hint}</b>
          </h4>
          <h4 className="guesses-text">
            Incorrect guesses:
            <b>{`${wrongGuessCount} / ${maxGuess}`}</b>
          </h4>
          <div className="keyboard">
            <Buttons getLetter={(letter) => checkLetter(letter)} setDisabled={(targetBtn) => setDisabledbtn(targetBtn)} removeDisabled={disable} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
