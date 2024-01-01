import '../styling/SearchBar.css';

function SearchBar(){
  return(
    <div className="barContainer">
      <div className = "logo">
        <div style = {{marginLeft:"10px", marginRight:"10px"}}>
          <div>Simplify Path</div>
          <div>Find Web Application</div>
        </div>
      </div>
      <input placeholder="Enter your query here" />
      <div>item 2</div>
    </div>
  );
}

export default SearchBar;
