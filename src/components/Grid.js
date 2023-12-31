import '../styling/Grid.css';
import React, { useEffect, useContext, useState } from 'react';
import SelectContext from './context.js';

function GridComponent(){
  const {selectionState, setSelectionState} = useContext(SelectContext);
  const {source, setSource} = useContext(SelectContext);
  const {sink, setSink} = useContext(SelectContext);

  //0 => available road   1 => Source  2 => Destination  3 => roadblock
  const {grid, setGrid} = useContext(SelectContext);
  const [isMouseOverGrid, setMouseOverGrid] = useState(false);
  const [block, setBlock] = useState(0);


  useEffect(() => {
    const gridElement = document.getElementsByClassName('grid')[0];
    const { left, top, width, height } = gridElement.getBoundingClientRect();
    const threshold = 1;
    fitGrid(width, height);

    const handleMouseMove = (e) => {
      var isOutside = (e.clientX <= left + threshold && e.clientX >= left - threshold)
      || (e.clientY <= top + threshold && e.clientY >= top - threshold);
      if (isOutside) {
        setGrid(grid);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [setGrid, grid]);

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
    var row = idx[0].substring(1);
    var col = idx[1];
    if(source === 0 && cell.className === "default"){
      grid[row][col] = 1;
      setSource(1);
    }else{
      alert("You can only select one Source");
    }
  }

  function selectDestination(id){
    var cell = document.querySelector(`#${id}`);
    var idx = id.split("_");
    var row = idx[0].substring(1);
    var col = idx[1];
    if(sink === 0 && cell.className === "default"){
      grid[row][col] = 2;
      setSink(1);
    }else{
      alert("You can only select one Sink");
    }
  }

  function selectBlock(id){
    var cell = document.querySelector(`#${id}`);
    var idx = id.split("_");
    var row = idx[0].substring(1);
    var col = idx[1];
    if(cell.className === "default"){
      grid[row][col] = 3;
      setBlock(block + 1);
    }else if(cell.className === "blocks"){
      grid[row][col] = 0;
      setBlock(block - 1);
    }
  }

  function handleClick(id){
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
      <table>
          <tbody>
            {grid.map((row, i ) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} id={`c${i}_${j}`}
                  onClick={() => handleClick(`c${i}_${j}`)}
                  className={
                  grid[i][j] === 0 ? 'default' :
                  grid[i][j] === 1 ? 'source' :
                  grid[i][j] === 2 ? 'sink' :
                  grid[i][j] === 3 ? 'blocks' :
                  grid[i][j] === 4 ? 'path' : ''}>
                    {}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default GridComponent;
