import '../styling/SearchBar.css';
import React, { useState, useEffect, useContext } from 'react';
import SelectContext from './context.js';
import { GenerateEmptyGrid } from './functions';

function SearchBar(){
  const [option, setOption] = useState([]);
  const [select, setSelect] = useState(0);
  const {source, setSource} = useContext(SelectContext);
  const {sink, setSink} = useContext(SelectContext);
  const {grid, setGrid} = useContext(SelectContext);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:8000/options',{
          method:'GET'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        var configuration = [];
        for(let i = 0; i < data.length; ++i){
          configuration.push(data[`${i}`].id);
        }
        setOption(configuration);
        setSelect(configuration[0]);
      } catch (error) {
        console.error('Error fetching options: ', error.message);
      }
    };
    fetchOptions();
  }, []);

  const submit = async () => {
    try{
      const response = await fetch('http://localhost:8000/load',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         key: select,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json())['0'];
      loadGrid(data);
    }catch(error){
      console.error('Error fetching options: ', error.message);
    }
  };

  const deleteConfig = async () => {
    try{
      const response = await fetch('http://localhost:8000/delete',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         key: select,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }catch(error){
      console.error('Error fetching options: ', error.message);
    }
  };

  const loadGrid = (data) => {
    var newGrid = GenerateEmptyGrid(25, 25);
    const source = data['source']['0'];
    const sink = data['destination']['0'];
    const blocks = data['block'];
    newGrid[source['0']][source['1']] = 1;
    newGrid[sink['0']][sink['1']] = 2;
    for(let i = 0; i < blocks.length; ++i){
      var currBlock = blocks[`${i}`];
      var row = currBlock['0'];
      var col = currBlock['1'];
      newGrid[row][col] = 3;
    }
    setSource(1);
    setSink(1);
    setGrid(newGrid);
  };

  return(
    <div className="barContainer">
      <div className = "logo">
        <div style = {{marginLeft:"10px", marginRight:"10px"}}>
          <div>Simplify Path</div>
          <div>Find Web App</div>
        </div>
      </div>
      <form>
        <label>
          <select type="text" name="query" placeholder="Select saved configuration" onChange = {(e) => {setSelect(e.target.value)}}>
          {option.map((opt) => (
            <option key={opt}>
              {opt}
            </option>
          ))}
          </select>
        </label>
        <div className={"buttons"}>
          <div className={"submit"} onClick={submit}>Load configuration</div>
          <div className={"submit"} onClick={deleteConfig}>Delete configuration</div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
