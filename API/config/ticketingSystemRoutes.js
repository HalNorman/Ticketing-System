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

// Theme router configuration

const ThemeController = require("../app/Controllers/ThemeController.js");
const themeRouter = require('koa-router')({
    prefix: '/theme'
});

themeRouter.get('/getTheme', ThemeController.getTheme, err => console.log("ticketing_system_routes.js: theme route error", err));

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:username/:password', LoginController.authorizeUser, (err) => console.log("ticketing_system_routes.js: login-route error:", err));

// Ticket router configuration.

const TicketController = require('../app/Controllers/TicketController.js');
const ticketRouter = require('koa-router')({
    prefix: '/ticket'
});

ticketRouter.use(VerifyJWT);
ticketRouter.get('/all-tickets', Authorize('admin'), TicketController.allTickets, err => console.log(`allTicket ran into an error: ${err}`));
ticketRouter.get('/:userID/all-tickets', Authorize('admin'), TicketController.allTicketsByUserID, err => console.log(`ticketWithUserID ran into an error: ${err}`));
ticketRouter.get('/:ticketID/ticketID', Authorize('admin'), TicketController.ticketWithTicketID, err => console.log(`ticketWithTicketID ran into an error: ${err}`));

// Template router configuration

const TemplateController = require("../app/Controllers/TemplateController.js");
const templateRouter = require("koa-router")({
    prefix: '/template'
})

templateRouter.use(VerifyJWT);
templateRouter.get('/all-templates', Authorize('admin'), TemplateController.allTemplates, err => console.log(`allTemplates ran into an error: ${err}`));
templateRouter.get('/all-templates-fields', Authorize('admin'), TemplateController.allTemplatesWithFields, err => console.log(`allTemplatesWithFields ran into an error: ${err}`));
templateRouter.get('/:templateID/template-fields-byID', Authorize('admin'), TemplateController.allTemplatesWithFields, err => console.log(`allTemplatesWithFields ran into an error: ${err}`));
// FieldTag Router configuration

const FieldTagController = require("../app/Controllers/FieldTagController.js");
const fieldTagRouter = require("koa-router")({
    prefix: '/fieldTag'
});

fieldTagRouter.use(VerifyJWT);
fieldTagRouter.get('/all-fieldTags-valid', Authorize('admin'), FieldTagController.allFieldTags, err => console.log(`allFieldTags ran into an error ${err}`));
/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    themeRouter.routes(),
    templateRouter.routes(),
    fieldTagRouter.routes(),
    loginRouter.routes(),
    ticketRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};

