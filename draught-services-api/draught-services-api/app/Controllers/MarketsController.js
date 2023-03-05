const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

const allMarkets = async (ctx) => {
    console.log('all markets called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM markets ORDER BY marketName`;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MarketController::allMarkets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMarkets.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allMarkets,
};