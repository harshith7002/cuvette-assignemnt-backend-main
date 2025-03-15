const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',  // Or use 'localhost'
    database: 'jobs_db',  // Your database name
    password: 'sairam',
    port: 5432, // Default PostgreSQL port
});

client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error', err.stack));

module.exports = client;
