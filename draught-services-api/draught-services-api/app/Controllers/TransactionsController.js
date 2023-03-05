const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

const allTransactions = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM transactions order by transactionID`;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactions", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactions.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const numTransactionOfCycle = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS count FROM transactions WHERE cycleID=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::numTransactionOfCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in numTransactionOfCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const allTransactionOfAccountInCycle = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        // SELECT * FROM transactions WHERE cycleID=? AND accountID=?
        const query = `SELECT 
                            T.transactionID,
                            T.transactionDate,
                            T.productID,
                            E.employeeName,
                            R.routeName,
                            T.taps
                        FROM
                            transactions AS T,
                            employees AS E,
                            routes as R
                        WHERE
                            T.cycleID = ? AND accountID = ?
                                AND E.employeeID = T.employeeID
                                AND R.routeID = T.routeID;`
        ;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.accountID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionOfAccountInCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionOfAccountInCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionOfRouteInCycle = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM transactions WHERE cycleID=? AND routeID=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.routeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionOfRouteInCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionOfRouteInCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionOfAllRoutesInCycle = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM transactions WHERE cycleID=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionOfAllRoutesInCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionOfAllRoutesInCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionOfMarketInCycle = async (ctx) => {
    console.log('all transactions called.');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM transactions WHERE cycleID=? AND marketID=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.marketID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionOfMarketInCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionOfMarketInCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionsOfCycle = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM transactions WHERE cycleID = ?;`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionsOfCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionsOfCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionsInCycleCuratedForAccounts = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT
                            T.accountID,
                            T.transactionID,
                            T.transactionDate,
                            E.employeeName,
                            R.routeName,
                            T.taps
                        FROM
                            transactions AS T,
                            employees AS E,
                            routes AS R
                        WHERE
                            E.employeeID = T.employeeID
                                AND T.cycleID = ?
                                    AND T.routeID = R.routeID
                        GROUP BY transactionID;`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionsOfCycle", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionsOfCycle.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionsInCycleCuratedForMarkets = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT
                            T.accountID,
                            T.transactionID,
                            T.transactionDate,
                            E.employeeName,
                            R.routeName,
                            T.taps,
                            M.marketName,
                            M.marketID
                        FROM
                            transactions AS T,
                            employees AS E,
                            routes AS R,
                            markets AS M
                        WHERE
                            E.employeeID = T.employeeID
                                AND T.cycleID = ?
                                    AND T.marketID = M.marketID
                        GROUP BY transactionID;`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionsInCycleCuratedForMarkets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionsInCycleCuratedForMarkets.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTransactionsInCycleCuratedForRoutes = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT
                            T.accountID,
                            T.transactionID,
                            T.transactionDate,
                            E.employeeName,
                            R.routeName,
                            T.taps,
                            M.marketName,
                            M.marketID,
                            A.accountName,
                            R.routeID
                        FROM
                            transactions AS T,
                            employees AS E,
                            routes AS R,
                            markets AS M,
                            accounts AS A
                        WHERE
                            E.employeeID = T.employeeID
                                AND T.cycleID = ?
                                AND T.marketID = M.marketID
                                AND T.accountID = A.accountID
                                AND T.routeID = R.routeID
                        GROUP BY transactionID;`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::allTransactionsInCycleCuratedForRoutes", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactionsInCycleCuratedForRoutes.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allTransactions,
    allTransactionOfAccountInCycle,
    numTransactionOfCycle,
    allTransactionOfRouteInCycle,
    allTransactionOfAllRoutesInCycle,
    allTransactionOfMarketInCycle,
    allTransactionsOfCycle,
    allTransactionsInCycleCuratedForAccounts,
    allTransactionsInCycleCuratedForMarkets,
    allTransactionsInCycleCuratedForRoutes
};