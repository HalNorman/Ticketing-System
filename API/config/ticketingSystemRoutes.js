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

themeRouter.get('/getTheme', ThemeController.getTheme, err => console.log("ticketing_system_routes.js: geTheme route error", err));
themeRouter.post('/setTheme/:primaryColor/:secondaryColor/:textColor', ThemeController.setTheme, err => console.log("ticketing_system_routes.js: setTheme route error", err))

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:username/:password', LoginController.authorizeUser, (err) => console.log("ticketing_system_routes.js: login-route error:", err));

// User router
const UserController = require('../app/Controllers/UserController.js');
const userRouter = require('koa-router')({
    prefix: '/user'
});
userRouter.use(VerifyJWT);
userRouter.get('/allActiveUsers', UserController.allActiveUsers, (err) => console.log(`allActiveUsers ran into an error: ${err}`));
userRouter.post('/addUser', UserController.addUser, (err) => console.log(`addUsers ran into an error: ${err}`));
userRouter.post('/editUsernamePassword', UserController.editUsernamePassword, (err) => console.log(`editUsernamePassword ran into an error: ${err}`));
userRouter.delete('/:userID/deleteUser', UserController.deleteUser, (err) => console.log(`editUsernamePassword ran into an error: ${err}`));

// Ticket router configuration.

const TicketController = require('../app/Controllers/TicketController.js');
const ticketRouter = require('koa-router')({
    prefix: '/ticket'
});

ticketRouter.use(VerifyJWT);
ticketRouter.get('/all-tickets', Authorize('admin'), TicketController.allTickets, err => console.log(`allTicket ran into an error: ${err}`));
ticketRouter.get('/:userID/all-tickets', Authorize('admin'), TicketController.allTicketsByUserID, err => console.log(`ticketWithUserID ran into an error: ${err}`));
ticketRouter.get('/:ticketID/ticketID', Authorize('admin'), TicketController.ticketWithTicketID, err => console.log(`ticketWithTicketID ran into an error: ${err}`));
ticketRouter.put('/addTicket', Authorize('admin'), TicketController.addTicket, err => console.log(`addTicket ran into an error: ${err}`));
ticketRouter.put('/:ticketID/completeTicket', Authorize('admin'), TicketController.completeTicket, err => console.log(`completeTicket ran into an error: ${err}`));

// Template router configuration

const TemplateController = require("../app/Controllers/TemplateController.js");
const templateRouter = require("koa-router")({
    prefix: '/template'
})

templateRouter.use(VerifyJWT);
templateRouter.get('/all-templates', Authorize('admin'), TemplateController.allTemplates, err => console.log(`allTemplates ran into an error: ${err}`));
templateRouter.get('/all-templates-fields', Authorize('admin'), TemplateController.allTemplatesWithFields, err => console.log(`allTemplatesWithFields ran into an error: ${err}`));
templateRouter.get('/:templateID/template-fields-byID', Authorize('admin'), TemplateController.templateWithFieldsByTemplateID, err => console.log(`allTemplatesWithFields ran into an error: ${err}`));
templateRouter.put('/addTemplate', Authorize('admin'), TemplateController.addTemplate, err => console.log(`addTemplate ran into an error: ${err}`));

// FieldTag Router configuration

const FieldTagController = require("../app/Controllers/FieldTagController.js");
const fieldTagRouter = require("koa-router")({
    prefix: '/fieldTag'
});

fieldTagRouter.use(VerifyJWT);
fieldTagRouter.get('/all-fieldTags-valid', Authorize('admin'), FieldTagController.allFieldTags, err => console.log(`allFieldTags ran into an error ${err}`));
fieldTagRouter.put('/addTicketFieldTags', Authorize('admin'), FieldTagController.applyFieldTagsToTicket, err => console.log(`applyFieldTagsToTicket ran into an error ${err}`));
fieldTagRouter.put('/addTemplateFieldTags', Authorize('admin'), FieldTagController.applyFieldTagsToTemplate, err => console.log(`applyFieldTagsTotemplate ran into an error ${err}`));
fieldTagRouter.put('/addFieldTag', Authorize('admin'), FieldTagController.addFieldTag, err => console.log(`addFieldTag ran into an error ${err}`));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    themeRouter.routes(),
    templateRouter.routes(),
    fieldTagRouter.routes(),
    loginRouter.routes(),
    ticketRouter.routes(),
    userRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};

