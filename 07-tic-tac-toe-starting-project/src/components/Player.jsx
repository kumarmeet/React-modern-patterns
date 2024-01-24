import React from "react";

export const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [IsEditing, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState(name);

  const inputHandler = (e) => {
    setValue(() => e.target.value);
  };

  const handlerClickEdit = () => {
    setIsEdit((editing) => !editing);
    onChangeName(symbol, value);
  };

  let playerName = <span className="player-symbol">{name}</span>;

  if (IsEditing) {
    playerName = (
      <input
        type="text"
        defaultValue={value}
        onChange={inputHandler}
        required
      />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {IsEditing ? playerName : value ? value : playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handlerClickEdit}>{IsEditing ? "Save" : "Edit"}</button>
    </li>
  );
};
