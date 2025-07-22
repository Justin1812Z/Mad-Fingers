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
        console.log("Correct key pressed");
        setX(x + 1);

        if (x == word.length - 1) {
          console.log("Word completed: " + word);
          setX(0); // Reset x to start over with the next word
          setWordCount(wordCount + 1); // Get a new random word
        }
      } else {
        console.log("Incorrect key pressed");
        console.log("word at 0: " + word[x]?.toLowerCase());
      }
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [word, x]);

  return (
    <div className="game">
      <h1>Game Component</h1>
      <div className="current-word">
        {word.split("").map((char, index) => (
          <h2
            className={x > index ? "correct-letter" : "letter"}
            key={index}
          >
            {char}
          </h2>
        ))}
      </div>
    </div>
  );
}
export default Game;
