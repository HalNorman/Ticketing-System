const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allTickets = async (ctx) => {
    console.log('tickets all tickets called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            ticket
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TicketsController::allTickets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTickets.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const ticketWithTicketID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query =  `SELECT 
                    A.ticketID, A.title, D.fName, D.lName, C.field, C.tag, A.info, A.dateCreated, A.dateModified 
                            FROM 
                    ticketingsystem.ticket A 
                            INNER JOIN 
                    ticketingsystem.ticketfieldtag B ON A.ticketID = B.ticketID 
                            INNER JOIN 
                    ticketingsystem.fieldtag C ON B.fieldtagID = C.fieldtagID 
                            INNER JOIN ticketingsystem.user D ON A.userID = D.userID 
                            WHERE A.ticketID = ?;
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.ticketID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TicketsController::ticketWithTicketID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in allTickets.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}


module.exports = {
    allTickets,
    ticketWithTicketID
};
