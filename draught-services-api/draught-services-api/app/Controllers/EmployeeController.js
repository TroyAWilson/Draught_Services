const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

const getAllActiveEmployees = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM employees WHERE status = 'Active';`;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in CycleController::getAllActiveEmployees", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getAllActiveEmployees.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    getAllActiveEmployees
};