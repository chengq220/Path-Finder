import '../styling/Grid.css';
import React, { useEffect, useContext } from 'react';
import SelectContext from './context.js';

function GridComponent(){
  const {selectionState, setSelectionState} = useContext(SelectContext);
  const {source, setSource} = useContext(SelectContext);
  const {sink, setSink} = useContext(SelectContext);

  useEffect(() => {
    fitGrid(25, 25);
  }, []);

  function generateGrid(width, height) {
    const rows = [];
    for (let i = 0; i < height; ++i) {
      const cells = [];
      for (let j = 0; j < width; ++j) {
        cells.push(
          <td id={`c${i}_${j}`} onClick={() => handleClick(`c${i}_${j}`)}>
              {}
          </td>
        );
      }
      rows.push(<tr>{cells}</tr>);
    }
    return <table><tbody>{rows}</tbody></table>;
  }

  function fitGrid(width, height){
    const tdElements = document.querySelectorAll('.grid td');
    const cellWidth = (100 / width) + '%';
    const cellHeight = (100 / height) + '%';

    tdElements.forEach((td) => {
      td.style.width = cellWidth;
      td.style.height = cellHeight;
    });
  }

  function handleClick(id){
    console.log(selectionState);
    var idx = id.split("_");
    var cell = document.querySelector(`#${id}`);
    if(selectionState === "s1"){
      if(cell.style.backgroundColor === "red"){
        cell.style.backgroundColor = "white";
        setSource(0);
      }
      else if(source === 0){
        cell.style.backgroundColor = "red";
        setSource(1);
      }
      else{
        alert("You can only select one Source")
      }
    }else if(selectionState === "s2"){
      if(cell.style.backgroundColor === "blue"){
        cell.style.backgroundColor = "white";
        setSink(0);
      }
      else if(sink === 0){
        cell.style.backgroundColor = "blue";
        setSink(1);
      }
      else{
        alert("You can only select one Destination")
      }
    }else if(selectionState === "s3"){
      if(cell.style.backgroundColor === "black"){
        cell.style.backgroundColor = "white";
      }else{
        cell.style.backgroundColor = "black";
      }
    }
  }

  return(
    <div className="grid">
      {generateGrid(25,25)}
    </div>
  );
}

export default GridComponent;
