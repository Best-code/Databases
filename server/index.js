require('dotenv').config();


// var GeoJSON = require('geojson'); - Reinstall if needed
const { Pool } = require('pg');
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Adjust if using a different frontend port
  credentials: true // Required for sending cookies
}));

const PORT = process.env.PORT || 4242;

// app.get('/raw', async (_, res) => {
//   const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });
//   const client = await pool.connect();
//   const result = await client.query(`select * from ${process.env.RAWTABLE};`);
//   client.release();

//   const GeoParsed = GeoJSON.parse(result.rows, {Point: ['latitude', 'longitude']})

//   res.json({ GeoParsed });
// });


app.get('/pixels', async (_, res) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const client = await pool.connect();
  const result = await client.query(`select * from ${process.env.PUBLICTABLE};`);
  client.release();

  const rows = result.rows

  res.json({ rows });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});