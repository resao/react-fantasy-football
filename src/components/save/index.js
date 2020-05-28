import React from "react";

export default (props) => {
  const players = [];

  for (let playerType in props.players) {
    players.push({ name: playerType, amount: props.players[playerType] });
  }

  const playerOutput = players.map((player) => {
    return (
      <span
        key={player.name}
        style={{ display: "inline-block", margin: "0 10px" }}
      >
        {player.name} ({player.amount})
      </span>
    );
  });

  return (
    <div>
      <p>Players: {playerOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
