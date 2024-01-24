import React from "react";

export const GameOver = ({ winner, onRestart, players }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{players[winner]} Won!</p> : <p>Tie Game!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
};
