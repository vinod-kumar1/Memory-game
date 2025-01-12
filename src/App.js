import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const emojiArrays = [
  "🐶",
  "🐷",
  "🐙",
  "🐛",
  "🐵",
  "🐶",
  "🐷",
  "🐙",
  "🐛",
  "🐵",
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    console.log(j);
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

export default function App() {
  let [gameon, setGameon] = useState(false);
  let emojiArray = useRef(shuffleArray(emojiArrays));
  function StartGameCard({ startGame }) {
    function start() {
      startGame(true);
    }
    return (
      <div>
        <h4>Click Start to play the memory game</h4>
        <button onClick={start}>Start</button>
      </div>
    );
  }

  function HideEle() {
    return <span>🟥</span>;
  }

  function MemoryCard() {
    let [openEmojis, setOpen] = useState([]);
    let [selecting, setSelecting] = useState(false);
    let [selectionStatus, setSelectionStatus] = useState("Start Selecting");

    let selected = useRef();

    useEffect(() => {
      if (openEmojis.length == emojiArray.current.length) {
        setSelectionStatus("Hooray!!! You've Won, Refresh Start again");
      }
    }, [openEmojis]);

    function startplay(index) {
      if (!selecting) {
        setSelecting(true);
        setOpen((p) => [...p, index]);
        selected.current = emojiArray.current[index];
        setSelectionStatus(
          `Selected ${emojiArray.current[index]}, try selecting it again`
        );
        return;
      } else {
        if (emojiArray.current[index] != selected.current) {
          setOpen((p) => {
            let res = [...p];
            res.pop();
            return res;
          });
          setSelectionStatus(`Selected item is not correct! Try Again!!!`);
        } else {
          setOpen((p) => [...p, index]);
          selected.current = "";
          setSelectionStatus(
            `You've selected right ${emojiArray.current[index]}, Continue`
          );
        }
        setSelecting(false);
      }
    }

    return (
      <div className="emojis">
        <div className="display-emojis">
          {emojiArray.current.map((emoji, index) => {
            return (
              <React.Fragment key={index}>
                <button
                  onClick={() => startplay(index)}
                  className={`card`}
                  key={index}
                >
                  {openEmojis.includes(index) ? emoji : <HideEle />}
                </button>
              </React.Fragment>
            );
          })}
          <p>{selectionStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Memory Game</h2>
      {gameon && <MemoryCard />}
      {!gameon && <StartGameCard startGame={setGameon} />}
    </div>
  );
}
