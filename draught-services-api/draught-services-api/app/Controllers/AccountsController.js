const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

const allAccounts = async (ctx) => {
    console.log('all accounts called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM accounts ORDER BY accountName`;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AccountsController::allAccounts", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allAccounts.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const getAllAccountsInCycle = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
        select * from accounts 
            where accountID 
            in (SELECT accountID FROM transactions where cycleID = ? group by accountID)
            and status = 'Active' 
            ORDER BY accountName ASC;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AccountsController::getAllAccountsInCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getAllAccountsInCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allAccounts,
    getAllAccountsInCycle
};