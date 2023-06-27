/* eslint-disable react/prop-types */
// Squares: le pasamos lo props que vamos a utilizar
export const Square = ({ children, isSelected, updateBoard, index }) => {
    // Muestra el turno
    const className = `square ${isSelected ? "is-selected" : ""}`;
    // click square
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };