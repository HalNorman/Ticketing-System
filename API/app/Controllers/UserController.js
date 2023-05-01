const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


function now() {
    return dateFormat(new Date(), "yyyy-mm-dd");
}

const allActiveUsers = async (ctx) => {
    console.log('users allActiveUsers called.');
    return new Promise((resolve, reject) => {
        const query = `
                        SELECT * 
                        FROM 
                            ticketingsystem.user
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::allActiveUsers", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allActiveUsers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addUser = async (ctx) => {
    console.log('users addUser called.');
    return new Promise((resolve, reject) => {
        const newUser = ctx.request.body;
        const query = `
                        INSERT INTO 
                            ticketingsystem.user
                        VALUES
                            (?, ?, ?, ?, ?)
                        `;
        dbConnection.query({
            sql: query,
            values: [newUser.fName, newUser.lName, newUser.role, newUser.username, newUser.password]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::addUser", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const editUsernamePassword = async (ctx) => {
    console.log('users editUsernamePassword called.');
    return new Promise((resolve, reject) => {
        const userCredentials = ctx.request.body;
        const query = `
                        UPDATE 
                            ticketingsystem.user 
                        SET 
                            username = ?, 
                            password = ? 
                        WHERE 
                            userID = ?
                        `;
        dbConnection.query({
            sql: query,
            values: [userCredentials.username, userCredentials.password, userCredentials.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::addUser", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allActiveUsers,
    addUser,
    editUsernamePassword
};
