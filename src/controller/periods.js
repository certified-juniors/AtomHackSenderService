const { collectAllPeriods } = require('../storage/database.js');

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

module.exports = {
    updatePeriods,
};
