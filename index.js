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

collectAllPeriods().then(() => {
    runNewConsumer().catch(error => console.error(`[consumer] ${error.message}`, error));
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});