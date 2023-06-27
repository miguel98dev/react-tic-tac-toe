import { WINNER_COMBOS } from "../constants";

// comprueba si hay ganador
export const checkWinnerFrom = (boardToCheck) => {
  // por cada combinación de WINNER_COMBOS
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    )
      return boardToCheck[a];
  }
  // si no hay ganador
  return null;
};
export const checkEndGame = (newBoard) => {
  // si todas las posiciones del nuevo tablero sus squares son diferentes a null, hay un empate
  return newBoard.every((square) => square !== null);
};