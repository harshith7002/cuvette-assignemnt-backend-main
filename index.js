const client = require('./db');

client.query('SELECT version()', (err, res) => {
    if (err) {
        console.error('Query error:', err.stack);
    } else {
        console.log('PostgreSQL Version:', res.rows[0]);
    }
    client.end();
});
