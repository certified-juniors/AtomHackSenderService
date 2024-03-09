const { collectAllPeriods, getAllPeriods } = require('../storage/database.js');

const updatePeriods = async (req, res) => {
    collectAllPeriods()
        .then(() => {
            res.status(200).send("Periods fetched successfully");
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error while fetching periods");
        })
};

const getPeriods = async (req, res) => {
    getAllPeriods().
        then((periods) => {
            res.status(200).send(periods);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error while fetching current periods");
        });
};

module.exports = {
    updatePeriods,
    getPeriods,
};
