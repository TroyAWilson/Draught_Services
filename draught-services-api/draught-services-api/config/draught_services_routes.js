const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("draught_services_routes.js: login-route error:", err));

// Routes router configuration.

const RoutesController = require('../app/Controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);


/*
|--------------------------------------------------------------------------
| Market router
|--------------------------------------------------------------------------
|
| Description
|
*/

const MarketController = require('../app/Controllers/MarketsController.js');

const marketRouter = require('koa-router')({
    prefix:'/markets'
});

marketRouter.use(VerifyJWT);
marketRouter.get('/market-test', (ctx)=>{
    console.log('Market Test Hit');
    ctx.body = 'Market Test Hit';
})
marketRouter.get('/all-markets', Authorize('admin'), MarketController.allMarkets, err=>console.log(`problem in all markets: ${err}`));

// --------------------------------------------------------------------------------------






/*
|--------------------------------------------------------------------------
| Account router
|--------------------------------------------------------------------------
|
| Description
|
*/

const AccountsController = require('../app/Controllers/AccountsController.js');
const accountsRouter = require('koa-router')({
    prefix:'/accounts'
});

accountsRouter.use(VerifyJWT);
accountsRouter.get('/accounts-test', (ctx)=>{
    console.log('Accounts Test Hit');
    ctx.body = 'Accounts Test Hit';
})
accountsRouter.get('/all-accounts', Authorize('admin'), AccountsController.allAccounts, err=>console.log(`problem in all accounts: ${err}`));
accountsRouter.get('/:cycleID', Authorize('admin'), AccountsController.getAllAccountsInCycle, err=>console.log(`problem in accounts of cycle: ${err}`));

// --------------------------------------------------------------------------------------



/*
|--------------------------------------------------------------------------
| Transaction router
|--------------------------------------------------------------------------
|
| Description
|
*/

const TransactionsController = require('../app/Controllers/TransactionsController.js');
const transactionRouter = require('koa-router')({
    prefix:'/transactions'
});

transactionRouter.use(VerifyJWT);
transactionRouter.get('/transactions-test', (ctx)=>{
    console.log('Transactions Test Hit');
    ctx.body = 'Transactions Test Hit';
})

transactionRouter.get('/all-transactions', Authorize('admin'), TransactionsController.allTransactions, err=>console.log(`problem with all transactions: ${err}`));

transactionRouter.get('/:cycleID/transaction-count', Authorize('admin'), TransactionsController.numTransactionOfCycle, err=>console.log(`problem with num transactions: ${err}`))

transactionRouter.get('/:cycleID/:accountID/one-account', Authorize('admin'), TransactionsController.allTransactionOfAccountInCycle, err=> console.log(`problem with transaction of account in cycle: ${err}`));

transactionRouter.get('/:cycleID/:routeID/trans-for-route', Authorize('admin'), TransactionsController.allTransactionOfRouteInCycle, err=>console.log(`Problem with transactions of route ${err}`));

transactionRouter.get('/:cycleID/all-routes', Authorize('admin'), TransactionsController.allTransactionOfAllRoutesInCycle, err=>console.log(`Problem with transactions of route in cycle: ${err}`));

transactionRouter.get('/:cycleID/:marketID/trans-for-market', Authorize('admin'), TransactionsController.allTransactionOfMarketInCycle, err=>console.log(`Problem with transactions of market in cycle: ${err}`));

transactionRouter.get('/:cycleID', Authorize('admin'), TransactionsController.allTransactionsOfCycle, err=>console.log(`Problem with all transactions of cycle: ${err}`));

transactionRouter.get('/:cycleID/all-transactions-curated', Authorize('admin'), TransactionsController.allTransactionsInCycleCuratedForAccounts, err=>console.log(`Problem with curated transactions for accounts: ${err}`));

transactionRouter.get('/:cycleID/all-transactions-curated-market', Authorize('admin'), TransactionsController.allTransactionsInCycleCuratedForMarkets, err=>console.log(`Problem with curated transactions for markets: ${err}`));

transactionRouter.get('/:cycleID/all-transactions-curated-routes', Authorize('admin'), TransactionsController.allTransactionsInCycleCuratedForRoutes, err=>console.log(`Problem with curated transactions for routes: ${err}`));

// --------------------------------------------------------------------------------------


/*
|--------------------------------------------------------------------------
| Cycle router
|--------------------------------------------------------------------------
|
| Description
|
*/

const CycleController = require('../app/Controllers/CycleController.js');
const cycleRouter = require('koa-router')({
    prefix:'/cycles'
});

cycleRouter.use(VerifyJWT);
cycleRouter.get('/cycle-test', (ctx)=>{
    console.log('Cycle Test Hit');
    ctx.body = 'Cycle Test Hit';
})

cycleRouter.get('/getMostRecent', Authorize('admin'), CycleController.getMostRecentCycle, err=>console.log(`Problem with get most recent cycle: ${err}`));
// --------------------------------------------------------------------------------------

/*
|--------------------------------------------------------------------------
| Employee router
|--------------------------------------------------------------------------
|
| Description
|
*/

const EmployeeController = require('../app/Controllers/EmployeeController.js');
const employeeRouter = require('koa-router')({
    prefix:'/employees'
});

employeeRouter.use(VerifyJWT);
employeeRouter.get('/all-active-employees', Authorize('admin'), EmployeeController.getAllActiveEmployees, err=>console.log(`Problem with get all active employees: ${err}`));


// --------------------------------------------------------------------------------------





/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    marketRouter.routes(),
    accountsRouter.routes(),
    transactionRouter.routes(),
    cycleRouter.routes(),
    employeeRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
