
const dbConnection = require('../../database/mySQLconnect');

const getTheme = async (ctx) => {
    console.log('theme getTheme called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            theme 
                        ORDER BY 
                            themeID 
                        LIMIT 1
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in ThemeController::getTheme", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTheme.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const setTheme = async (ctx) => {
    console.log('theme setTheme called.');
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE theme
                        SET primaryColor = ?,
                        secondaryColor = ?,
                        textColor = ?
                        WHERE themeID = '1'
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.primaryColor,ctx.params.secondaryColor,ctx.params.textColor]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in ThemeController::getTheme", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTheme.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    getTheme,
    setTheme
};
