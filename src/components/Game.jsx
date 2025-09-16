import React, { useState } from 'react'
import Square from './Square'
import './Game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]           // diagonals
    ];
    for (let [a, b, c] of lines) {

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }

    }
    return null;
}

function Game() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    let newRound = false;

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Vencedor: ' + winner;
        newRound = true;
    } else if (!squares.includes(null)) {
        status = 'Empate!';
        newRound = true;
    } else {
        status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
    }

    function handleSquareClick(i) {
        if (squares[i] || winner) return;
        const nextSquares = [...squares];
        nextSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
       
    }

    function resetGame(){
        setSquares(Array(9).fill(null));
    }

    return (
        <div className='game' >
            <h1 className='title' >Jogo da Velha</h1>
            <div className='status' >{status}</div>
            <div className="board">
                <div className="row"> {[0, 1, 2].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
                <div className="row">{[3, 4, 5].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
                <div className="row">{[6, 7, 8].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
            </div>
            { newRound && <button className="reset" onClick={()=>resetGame()} >
                Novo Jogo
            </button>}

        </div>
    )
}

export default Game