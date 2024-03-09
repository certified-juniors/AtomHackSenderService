const { Pool } = require('pg');
const { Period, periods, clearPeriods, distributeUnhandledMessages } = require('../period');

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
        clearPeriods();
        const res = await pool.query('SELECT * FROM period');
        for (let row of res.rows) {
            periods.push(new Period(row.start_time, row.end_time, row.speed));
            periods.sort((a, b) => a.start_time - b.start_time);
        }
        distributeUnhandledMessages();
    }
    catch (err) {
        console.error(err);
    }
}

const getAllPeriods = async () => {
    try {
        const res = await pool.query('SELECT * FROM period');
        const formattedPeriods = [];
        for (let row of res.rows) {
            formattedPeriods.push([row.start_time, row.end_time, row.speed]);
        }

        return formattedPeriods.sort((a, b) => a.start_time - b.start_time);
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    collectAllPeriods,
    getAllPeriods,
};