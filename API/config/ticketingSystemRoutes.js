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
    return ctx.body = 'API is running';
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
loginRouter.get('/:email/:password', LoginController.authorizeUser, (err) => console.log("ticketing_system_routes.js: login-route error:", err));

// Ticket router configuration.

const TicketController = require('../app/Controllers/TicketController.js');
const ticketRouter = require('koa-router')({
    prefix: '/ticket'
});

ticketRouter.use(VerifyJWT);
ticketRouter.get('/all-tickets', Authorize('admin'), TicketController.allTickets, err => console.log(`allTicket ran into an error: ${err}`));
ticketRouter.get('/:ticketID/ticketID', Authorize('admin'), TicketController.ticketWithTicketID, err => console.log(`ticketWithTicketID ran into an error: ${err}`));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    ticketRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};

