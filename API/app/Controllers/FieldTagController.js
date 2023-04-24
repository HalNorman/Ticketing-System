const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allFieldTags = async (ctx) => {
    console.log('fieldTags allFieldTags called.');
    return new Promise((resolve, reject) => {
        const query = `
                        SELECT * 
                        FROM 
                            ticketingsystem.fieldtag 
                        WHERE 
                            valid = 1
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FieldTagController::allFieldTags", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allFieldTags.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allFieldTags
};
