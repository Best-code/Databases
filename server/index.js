require('dotenv').config();

var GeoJSON = require('geojson');
const { Pool } = require('pg');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4242;

app.get('/raw', async (_, res) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const client = await pool.connect();
  const result = await client.query(`select * from ${process.env.RAWTABLE};`);
  client.release();

  const GeoParsed = GeoJSON.parse(result.rows, {Point: ['latitude', 'longitude']})

  res.json({ GeoParsed });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});