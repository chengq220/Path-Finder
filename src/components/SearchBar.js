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
      <form>
        <label>
          <input type="text" name="query" placeholder="Search for location"/>
        </label>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
