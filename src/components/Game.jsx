import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./Game.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // colunas
    [0, 4, 8],
    [2, 4, 6], // diagonais
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // "X" ou "O"
    }
  }

  // só chega aqui se não houve vitória
  if (!squares.includes(null)) return "draw";

  return null; // jogo continua
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreDraw, setScoreDraw] = useState(0);
  let newRound = false;
  const winner = calculateWinner(squares);
  let status;

  if (winner && winner !== "draw") {
    status = "Vencedor: " + winner;
    newRound = true;
  } else if (!squares.includes(null)) {
    status = "Empate!";
    newRound = true;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  function handleSquareClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);

    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  useEffect(() => {
    if (winner === "X") {
      setScoreX(scoreX + 1);
    } else if (winner === "O") {
      setScoreO(scoreO + 1);
    } else if (winner === "draw") {
      setScoreDraw(scoreDraw + 1);
    }
  }, [winner]);

  return (
    <div className="game">
      <h1 className="title">Jogo da Velha</h1>
      <div className="status">{status}</div>
      <div className="board">
        <div className="row">
          {" "}
          {[0, 1, 2].map((i) => (
            <Square
              value={squares[i]}
              onClick={() => handleSquareClick(i)}
              key={i}
            />
          ))}
        </div>
        <div className="row">
          {[3, 4, 5].map((i) => (
            <Square
              value={squares[i]}
              onClick={() => handleSquareClick(i)}
              key={i}
            />
          ))}
        </div>
        <div className="row">
          {[6, 7, 8].map((i) => (
            <Square
              value={squares[i]}
              onClick={() => handleSquareClick(i)}
              key={i}
            />
          ))}
        </div>
      </div>
      {newRound && (
        <button
          className="reset"
          onClick={() => {
            resetGame();
          }}
        >
          Novo Jogo
        </button>
      )}
      <div className="scores">
        <h3>Placar de vitórias</h3>
        <p>X - {scoreX} vitória(s)</p>
        <p>O - {scoreO} vitória(s)</p>
        <p>Empate - {scoreDraw} empate(s)</p>
      </div>
    </div>
  );
}

export default Game;
