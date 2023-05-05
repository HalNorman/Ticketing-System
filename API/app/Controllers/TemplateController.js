const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


function now() {
    return dateFormat(new Date(), "yyyy-mm-dd");
}

const allTemplatesWithFields = async (ctx) => {
    console.log('templates allTemplatesWithFields called.');
    return new Promise((resolve, reject) => {
        const query = `
                        SELECT * 
                        FROM 
                            ticketingsystem.template A 
                        INNER JOIN 
                            ticketingsystem.templatefieldtag B 
                        ON 
                            A.templateID = B.templateID 
                        INNER JOIN 
                            ticketingsystem.fieldtag C 
                        ON 
                            B.fieldtagID = C.fieldtagID
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TemplateController::allTemplatesWithFields", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTemplatesWithFields.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const templateWithFieldsByTemplateID = async (ctx) => {
    console.log('templates allTemplatesWithFields called.');
    return new Promise((resolve, reject) => {
        const query = `
                        SELECT * 
                        FROM 
                            ticketingsystem.template A 
                        INNER JOIN 
                            ticketingsystem.templatefieldtag B 
                        ON 
                            A.templateID = B.templateID 
                        INNER JOIN 
                            ticketingsystem.fieldtag C 
                        ON 
                            B.fieldtagID = C.fieldtagID
                        WHERE
                            A.templateID = ?
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.templateID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TemplateController::allTemplatesWithFields", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTemplatesWithFields.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addTemplate = (ctx) => {
    return new Promise((resolve, reject) => {
        const template = ctx.request.body;
        const query =  `INSERT INTO 
                            ticketingsystem.template
                            (title, info)
                        VALUES
                            (?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [template.title, template.info]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TemplateController::addTemplate", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addTemplate.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const allTemplates = async (ctx) => {
    console.log('templates all allTemplates called.');
    return new Promise((resolve, reject) => {
        const query = `
                        SELECT * FROM 
                            ticketingsystem.template
                        `;
        dbConnection.query({
            sql: query
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TemplateController::allTemplates", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTemplates.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}
const deleteTemplate = async (ctx) => {
    console.log('templates all deleteTemplate called.');
    return new Promise((resolve, reject) => {
        const query = `
                        DELETE FROM 
                            ticketingsystem.template
                        WHERE templateID = ?
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.templateID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TemplateController::deleteTemplate", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in deleteTemplate.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allTemplatesWithFields,
    allTemplates,
    templateWithFieldsByTemplateID,
    addTemplate,
    deleteTemplate
};
