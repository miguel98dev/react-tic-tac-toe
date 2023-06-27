/* eslint-disable react/prop-types */

import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

export function App() {
  // definimos el tablero
  const [board, setBoard] = useState(() => {
    // recuperamos lo guardado en localStorage
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  // definimos el turno y quien comienza
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    // ?? comprueba si es nulo o falso
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay un ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  // reseteamos el estado
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  // actualizar tablero || se le llama desde handleClick()
  const updateBoard = (index) => {
    // si ya tiene algo no actualizamos esta posición
    if (board[index] || winner) return;
    // creamos el nuevo tablero, pasándole el index del square clickado
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // nuevo turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida el localStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      // la actualización de los estados en react son asíncronos
      // alert(`Ganador es ${newWinner}`);
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );

}

export default App;

