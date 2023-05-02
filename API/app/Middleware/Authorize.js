// const ApiProblem = require('../Helpers/ApiProblem.js');

const setAccessToken = require('../../config/setAccessToken');

module.exports = (min_type) => {
    return (ctx, next) => {
        console.log('min_type in authorize is', min_type);

        console.log('In Authorize. ctx.state = ', ctx.state);
        console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

        const user_type = ctx.state.jwtdata.user.role;

        if (user_type === 'admin' || user_type === 'employee' || user_type === 'user') {
            setAccessToken(ctx, ctx.state.jwtdata.user);
            return next();
        }
        console.log("user has been rejected");
        return false;
    };
};
