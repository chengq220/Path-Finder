const { Queue } = require("./queue");
//Represent the graph in CSR format
//Performs the dijkstra's algorithm on the csr adjacency reprseentation
const bfs = (grid) => {
  var source = []
  var destin = []
  var block = []

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j){
      if(grid[i][j] == 1){
        source = [i,j];
      }
      if(grid[i][j] == 2){
        destin = [i,j];
      }
      if(grid[i][j] == 3){
        block.push([i,j]);
      }
    }
  }
  //[weight, visited, parent]
  var graph = Array.from({ length: 25 }).map(() =>
    Array.from({ length: 25 }).fill([10000000, false, []])
  );
  //handle the black case by omitting them from the traversal
  for(let i=0; i < block.length; ++i){
    var el = block[i]
    graph[el[0]][el[1]] = [10000000,true,[-1,-1]]
  }
  graph[source[0]][source[1]] = [0, true, []];
  var q = new Queue();
  q.enqueue(source);
  while(!q.isEmpty()){
    var curr = q.peek();
    if(curr[0] === destin[0] && curr[1] === destin[1]){
      break;
    }
    var currEl = graph[curr[0]][curr[1]];
    if(curr[1]+1 <25 && !(graph[curr[0]][curr[1]+1])[1]){
      // console.log("down condition fired");
      graph[curr[0]][curr[1]+1] = [currEl[0]+1, true, curr]
      q.enqueue([curr[0], curr[1]+1])
    }
    if(curr[1]-1 >= 0 && !(graph[curr[0]][curr[1]-1])[1]){
      // console.log("up condition fired");
      graph[curr[0]][curr[1]-1] = [currEl[0]+1, true, curr]
      q.enqueue([curr[0], curr[1]-1])
    }
    if(curr[0]-1 >= 0 && !(graph[curr[0]-1][curr[1]])[1]){
      // console.log("left condition fired");
      graph[curr[0]-1][curr[1]] = [currEl[0]+1, true, curr]
      q.enqueue([curr[0]-1, curr[1]])
    }
    if(curr[0]+1 < 25 && !(graph[curr[0]+1][curr[1]])[1]){
      // console.log("right condition fired");
      graph[curr[0]+1][curr[1]] = [currEl[0]+1, true, curr]
      q.enqueue([curr[0]+1, curr[1]])
    }
    q.dequeue();
  }

  //backtrack to find the order
  var backTrackArr = []
  var destinEl = graph[destin[0]][destin[1]][2];
  while(destinEl[0] != source[0] || destinEl[1] != source[1]){
    // console.log(destinEl);
    backTrackArr.push(destinEl);
    destinEl = graph[destinEl[0]][destinEl[1]][2];
  }
  return backTrackArr;
};

module.exports = { bfs };
