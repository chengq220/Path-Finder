const express = require('express');
// const mysql = require('mysql2');

const app = express();
const port = 8000;

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
