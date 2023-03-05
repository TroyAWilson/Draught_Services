const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

const getMostRecentCycle = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM cycles ORDER BY cycleID DESC LIMIT 1;`;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in CycleController::getMostRecentCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getMostRecentCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    getMostRecentCycle
};