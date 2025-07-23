import axios from "axios";
import { useEffect, useState } from "react";
import "./Game.css";

function Game() {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState("Loading");
  const [words, setWords] = useState<string[]>([]);
  const [x, setX] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  //const [key, setKey] = useState("Error")

  //Fetch words from API
  const fetchAPI = async () => {
    await axios
      .get("https://random-word-api.herokuapp.com/word?number=42")
      .then((response) => {
        console.log(response.data);
        setWords(response.data);

        // You should NOT log backendData here, it's not updated yet
        // // Log directly from the response
      })
      .then(() => setLoading(false));
  };

  //Update word
  useEffect(() => {
    if (words.length > 0) {
      setWord(words[wordCount]);
    }
  }, [words, wordCount]);

  //Run when component mounts (page loads)
  useEffect(() => {
    fetchAPI();
  }, []);

  //Handle key strokes and check if they match the current word
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === word[x]?.toLowerCase()) {
        setX(x + 1);

        if (x == word.length - 1) {
          setX(0); // Reset x to start over with the next word
          setWordCount(wordCount + 1); // Get a new random word
        }
      } 
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [word, x]);

  useEffect(() => {
    const wordContainer = document.querySelector(".word-container") as HTMLElement;
    const currentWordElement = document.querySelector(".current-word") as HTMLElement;
  
    if (wordContainer && currentWordElement) {
      const wordWidth = currentWordElement.offsetWidth; // Get the width of the current word
      wordContainer.style.transform = `translateX(-${wordWidth}px)`; // Shift left by the width of the completed word
    }
  }, [wordCount]);
  
  return (
    <div className="game">
      <div className="word-container">
        {words.map((word, index) => (
          <span
            className={
              index === wordCount
                ? "current-word"
                : index < wordCount
                ? "completed-word"
                : "future-word"
            }
            key={index}
          >
            {index === wordCount
              ? word.split("").map((char, charIndex) => (
                  <span
                    className={x > charIndex ? "correct-letter" : "letter"}
                    key={charIndex}
                  >
                    {char}
                  </span>
                ))
              : word}
          </span>
        ))}
      </div>
    </div>
  );
}
export default Game;
