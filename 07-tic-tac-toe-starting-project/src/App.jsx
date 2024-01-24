import { useState } from "react";
import { GameBord } from "./components/GameBord";
import { Player } from "./components/Player";
import { Logs } from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combination";
import { GameOver } from "./components/GameOver";

const initialGameBorad = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const derivedActivePlayer = (turns) => {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const derivedWinner = (gameBoard) => {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    console.log(firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol);

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  return winner;
};

const derivedGameBoard = (gameTurn) => {
  let gameBoard = [...initialGameBorad.map((row) => [...row])];

  for (const turn of gameTurn) {
    const {
      square: { row, col },
      player,
    } = turn;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const initialPlayerNames = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = useState(initialPlayerNames);

  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurn);

  const gameBoard = derivedGameBoard(gameTurn);

  const winner = derivedWinner(gameBoard);

  const hasDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handlerRestart = () => {
    setGameTurn([]);
    gameBoard = initialGameBorad;
    winner = null;
    hasDraw = null;
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <>
      <main>
        <div id="game-container">
          <ol
            id="players"
            className="highlight-player"
          >
            <Player
              name={players.X}
              symbol={"X"}
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              name={players.O}
              symbol={"O"}
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver
              winner={winner}
              draw={hasDraw}
              onRestart={handlerRestart}
              players={players}
            />
          )}
          <GameBord
            onSelectSquare={handleSelectSquare}
            board={gameBoard}
          />
        </div>
        <Logs
          turns={gameTurn}
          players={players}
        />
      </main>
    </>
  );
}

export default App;
