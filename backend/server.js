const { bfs } = require('./bfs');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const databse = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pathfind',
  connectionLimit: 10,
});

const databasePool = databse.promise();

app.post('/save', async (req, res) => {
  var data = (req.body).key;
  var source = []
  var destin = []
  var block = []

  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[0].length; ++j){
      if(data[i][j] == 1){
        source.push([i,j]);
      }
      if(data[i][j] == 2){
        destin.push([i,j]);
      }
      if(data[i][j] == 3){
        block.push([i,j]);
      }
    }
  }
  try {
    const [result] = await databasePool.query('INSERT INTO pathfindt (source, destination, block) VALUES (?, ?, ?)', [
      JSON.stringify(source),
      JSON.stringify(destin),
      JSON.stringify(block)
    ]);
    if (result.affectedRows > 0) {
      console.log('Data inserted successfully.');
    } else {
      console.log('Data not inserted.');
    }
  }catch(error){
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.json({ message: 'Save Endpoint accessed successfully' });
});

app.get('/options', async (req, res) => {
  try{
      const result = (await databasePool.query('SELECT id FROM pathfindt'))['0'];
      res.send(result);
  }catch(error){
    console.error('Error reading data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/load', async (req, res) => {
  const id = (req.body).key;
  try{
      const result = (await databasePool.query('SELECT * FROM pathfindt WHERE id=?', id))['0'];
      // console.log(result);
      res.send(result);
  }catch(error){
    console.error('Error reading data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/delete', async (req, res) => {
  const id = (req.body).key;
  try{
      const result = (await databasePool.query('DELETE FROM pathfindt WHERE id=?', id))['0'];
      res.send(result);
  }catch(error){
    console.error('Error reading data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/execute', async (req, res) => {
  const grid = (req.body).key
  var solution = bfs(grid);
  res.send(JSON.stringify(solution));
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
