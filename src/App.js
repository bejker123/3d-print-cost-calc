import './App.css';
import { useState } from 'react';

function Square({value, onSquareClick}){
  return <button
          className="square"
          onClick={onSquareClick}
         >
            {value}
         </button>
}

function Row({values,onSquareClick}){
  return <div className='board-row'>
      <Square value={values[0]} onSquareClick={()=>{onSquareClick(values[0])}}/>
      <Square value={values[1]} onSquareClick={()=>{onSquareClick(values[1])}}/>
      <Square value={values[2]} onSquareClick={()=>{onSquareClick(values[2])}}/>
  </div>
}

function Board() {
  const [squares, setSquares] = useState([0,1,2,3,4,5,6,7,8]);

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return (
    <>
      <Row values={squares.slice(0,3)} onSquareClick={handleClick}/>
      <Row values={squares.slice(3,6)} onSquareClick={handleClick}/>
      <Row values={squares.slice(6,9)} onSquareClick={handleClick}/>
    </>
  );
}

export default Board;
