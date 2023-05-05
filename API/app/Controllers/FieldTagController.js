const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


function now() {
    return dateFormat(new Date(), "yyyy-mm-dd");
}
//this should take an array of objects
const applyFieldTagsToTicket = async (ctx) => {
    console.log('fieldTags applyFieldTagsToTicket called.');
    return new Promise((resolve, reject) => {
        const fieldTagArray = ctx.request.body
        fieldTagArray.forEach(element => {
            const query = `
                        INSERT INTO
                            ticketingsystem.ticketfieldtag 
                            (ticketID, fieldtagId) 
                        VALUES
                            (?, ?)
                        `;
        dbConnection.query({
            sql: query,
            values: [element.ticketID, element.fieldTagID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FieldTagController::applyFieldTagsToTicket", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
        }); 
    }).catch(err => {
        console.log("Database connection error in applyFieldTagsToTicket.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}
//this should take an array of objects 
const applyFieldTagsToTemplate = async (ctx) => {
    console.log('fieldTags applyFieldTagsToTemplate called.');
    return new Promise((resolve, reject) => {
        const fieldTagArray = ctx.request.body
        fieldTagArray.forEach(element => {
            const query = `
                        INSERT INTO
                            ticketingsystem.templatefieldtag
                            (templateID, fieldtagId) 
                        VALUES
                            (?, ?)
                        `;
        dbConnection.query({
            sql: query,
            values: [element.templateID, element.fieldTagID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FieldTagController::applyFieldTagsToTemplate", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
        }); 
    }).catch(err => {
        console.log("Database connection error in applyFieldTagsToTemplate.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}
//this should take an object
const addFieldTag = async (ctx) => {
    console.log('fieldTags addFieldTag called.');
    return new Promise((resolve, reject) => {
        const fieldTag = ctx.request.body
            const query = `
                        INSERT INTO
                            ticketingsystem.fieldtag 
                            (field, tag)
                        VALUES
                            (?, ?)
                        `;
        dbConnection.query({
            sql: query,
            values: [fieldTag.field, fieldTag.tag]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FieldTagController::addFieldTag", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        }); 
    }).catch(err => {
        console.log("Database connection error in applyFieldTagsToTemplate.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
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

const removeFieldTag = async (ctx) => {
    console.log('fieldTags removeFieldTag called.');
    return new Promise((resolve, reject) => {
        const fieldTag = ctx.request.body
            const query = `
                        UPDATE
                            ticketingsystem.fieldtag 
                        SET
                            valid = 0
                        WHERE 
                            fieldtagID = ?
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.fieldTagID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FieldTagController::removeFieldTag", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        }); 
    }).catch(err => {
        console.log("Database connection error in removeFieldTag.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allFieldTags,
    applyFieldTagsToTicket,
    applyFieldTagsToTemplate,
    addFieldTag,
    removeFieldTag
};
