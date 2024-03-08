const { Pool } = require('pg');

let periods = [];

require('dotenv').config();

const pool = new Pool({
    user: process.env.PERIODS_POSTGRES_USER,
    host: process.env.PERIODS_POSTGRES_HOST,
    database: process.env.PERIODS_POSTGRES_DB,
    password: process.env.PERIODS_POSTGRES_PASSWORD,
    port: 5432,
});

const collectAllPeriods = async () => {
    try {
        const res = await pool.query('SELECT * FROM period');
        periods = res.rows;
        console.log(periods);
        return periods;
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    collectAllPeriods,
    periods
};