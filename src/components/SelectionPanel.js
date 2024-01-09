import '../styling/Selection.css';
import React, { useState, useContext} from 'react';
import SelectContext from './context.js';

function Selection(){
  const {selectionState, setSelectionState} = useContext(SelectContext);
  const {grid, setGrid} = useContext(SelectContext);
  const [exe, setExe] = useState(false);

  function select(state){
    const active = document.querySelectorAll(".active");
    if(active.length > 0){
      active[0].classList.remove('active');
    }

    try {
      const element = document.querySelector(`.${state}`);

      if (element) {
        element.classList.add('active');
      } else {
        console.error(`Element with selector "${state}" not found.`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    if(state === "s1"){
      setSelectionState("s1");
    }else if(state === "s2"){
      setSelectionState("s2");
    }else if(state === "s3"){
      setSelectionState("s3");
    }else{
      setSelectionState("init"); //set to default
    }
  }

  const execute = async() => {
    try{
      const response = await fetch("http://localhost:8000/execute",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         key: grid,
        }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      for(let i = 0; i < responseData.length; ++i){
        var item = responseData[`${i}`];
        grid[item[0]][item[1]] = 4;
      }
      console.log(grid);
      setGrid(grid);
      setExe(true);
      // console.log('Response from server:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
  }

  const save = async () => {
    // console.log("save triggered");
    try{
      const response = await fetch("http://localhost:8000/save",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         key: grid,
        }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log('Response from server:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
  };

  return(
    <div className="panel">
      <div onClick = {() => select("s1")} className="options s1">Select Source</div>
      <div onClick = {() => select("s2")} className="options s2">Select Destination</div>
      <div onClick = {() => select("s3")} className="options s3">Add Road Block</div>
      <div onClick = {() => select("init")} className="options">Default</div>
      <div onClick = {save} className="options">Save Configuration</div>
      <div onClick = {() => execute()} className="options">Execute</div>
      <div className="options"></div>
    </div>
  );
}

export default Selection;
