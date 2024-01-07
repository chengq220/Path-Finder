import '../styling/SearchBar.css';
import React, { useState, useEffect } from 'react';

function SearchBar(){
  const [option, setOption] = useState([]);
  const [select, setSelect] = useState(0);
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
      console.log(data);
    }catch(error){
      console.error('Error fetching options: ', error.message);
    }
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
        <div className={"submit"} onClick={submit}>Load</div>
      </form>
    </div>
  );
}

export default SearchBar;
