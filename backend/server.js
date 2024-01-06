const express = require('express');
const cors = require('cors');
// const mysql = require('mysql2');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/save', (req, res) => {
  console.log(req.body);
  const data = req.body;
  console.log(data[0][0]);
  // var source = []
  // var destin = []
  // var block = []

  // for (let i = 0; i < data.length; ++i) {
  //   for (let j = 0; j < data[0].length; ++j){
  //     console.log("loop");
  //     if(data[i][j] == 1){
  //       console.log("start");
  //       source.push([i,j]);
  //     }
  //     if(data[i][j] == 2){
  //       console.log("destination");
  //       destin.push([i,j]);
  //     }
  //     if(data[i][j] == 3){
  //       console.log("block");
  //       block.push([i,j]);
  //     }
  //   }
  // }
  // console.log(source);
  // console.log(destin);
  // console.log(block);
  res.json({ message: 'Save Endpoint accessed successfully' });
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'pathfind',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// pool.query('SELECT * FROM pathfindt', (err, results) => {
//   if (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } else {
//     res.json(results);
//   }
// });
//
// app.post('/', (req, res) => {
//   console.log("Received POST request from front-end");
//   res.send("POST request received successfully");
// });
