import '../styling/Grid.css';
import React, { useEffect, useContext, useState } from 'react';
import SelectContext from './context.js';
import BorderEvent from './events.js';
import debounce from 'lodash.debounce';

function GridComponent(){
  const {selectionState, setSelectionState} = useContext(SelectContext);
  const {source, setSource} = useContext(SelectContext);
  const {sink, setSink} = useContext(SelectContext);

  //0 => available road   1 => Source  2 => Destination  3 => roadblock
  const {grid, setGrid} = useContext(SelectContext);
  const [isMouseOverGrid, setMouseOverGrid] = useState(false);

  useEffect(() => {
    const gridElement = document.getElementsByClassName('grid')[0];
    const { left, top, width, height } = gridElement.getBoundingClientRect();
    const threshold = 1;

    const handleMouseMove = (e) => {
      var isOutside = (e.clientX <= left + threshold && e.clientX >= left - threshold)
      || (e.clientY <= top + threshold && e.clientY >= top - threshold);
      if(isOutside){
        setGrid(grid);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
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
    fitGrid(25, 25);
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

  function selectSource(id){
    var cell = document.querySelector(`#${id}`);
    var idx = id.split("_");
    var row = idx[0].charAt(1);
    var col = idx[1];
    if(source === 0 && cell.style.backgroundColor === ""){
      cell.style.backgroundColor = "red";
      grid[row][col] = 1;
      setSource(1);
    }else{
      alert("You can only select one Source");
    }
  }

  function selectDestination(id){
    var cell = document.querySelector(`#${id}`);
    var idx = id.split("_");
    var row = idx[0].charAt(1);
    var col = idx[1];
    if(sink === 0 && cell.style.backgroundColor === ""){
      cell.style.backgroundColor = "blue";
      grid[row][col] = 2;
      setSink(1);
    }else{
      alert("You can only select one Sink");
    }
  }

  function selectBlock(id){
    var cell = document.querySelector(`#${id}`);
    var idx = id.split("_");
    var row = idx[0].charAt(1);
    var col = idx[1];
    if(cell.style.backgroundColor !== "red" || cell.style.backgroundColor !== "blue"){
      if(cell.style.backgroundColor === "white" || cell.style.backgroundColor === ""){
        cell.style.backgroundColor = "black";
        grid[row][col] = 3;
      }else{
        cell.style.backgroundColor = "white";
        grid[row][col] = 0;
      }
    }
  }

  function handleClick(id){
    // var idx = id.split("_");
    // console.log(idx);
    // var cell = document.querySelector(`#${id}`);
    if(selectionState === "s1"){
      selectSource(id);
    }else if(selectionState === "s2"){
      selectDestination(id);
    }else if(selectionState === "s3"){
      selectBlock(id);
    }
  }

  return(
    <div className="grid">
      {generateGrid(25,25)}
    </div>
  );
}

export default GridComponent;
