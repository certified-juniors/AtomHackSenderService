const express = require('express');
const cors = require('cors');
const { collectAllPeriods } = require('./src/storage/database');
const { updatePeriods, getPeriods } = require('./src/controller/periods.js');
const { runNewConsumer } = require('./src/kafka/consumer.js');
const { periods } = require('./src/period.js');

require('dotenv').config();

const app = express();
const port = 3000 || process.env.SS_PORT;

app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Define your routes here
app.post("/periods", updatePeriods);
app.get("/periods", getPeriods);
app.get("/logperiods", (req, res) => {
    console.log(periods);
});

collectAllPeriods().then(() => {
    runNewConsumer().catch(error => {
        console.error(`[consumer] ${error.message}`, error)
        process.exit(1);
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});