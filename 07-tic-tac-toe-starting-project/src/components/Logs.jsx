import React from "react";

export const Logs = ({ turns, players }) => {
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>{`${
          players[turn.player]
        } selected ${turn.square.row} ${turn.square.col}`}</li>
      ))}
    </ol>
  );
};
