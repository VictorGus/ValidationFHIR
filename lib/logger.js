const getObjectFromFile = require('./data.js');
/**
 * Class Logger is used for logging
 *
 * @author VictorGus
 * @version 1.0
 */
class Logger {
    /**
     * Creates new logger instance
     *
     * @constructor
     * @param {Object} errors is array of validation errors
     * @param {Object} resource is FHIR resource that is being validated 
     */
    constructor(errors, resource) {
        this.errors = errors;
        this.resource = resource;
        this.errorLog = this.log();
    }

    get loggedErrors() {
        return this.errorLog; 
    }

    /**
     * Creates log for validation errors
     *
     * @returns {Object} errorLog is array of logged errors 
     */
    log() {
        var errorLog = [];
        var arrayOfErrorsParams = [];
        for(let i = 0; i < 5; i++) {
            arrayOfErrorsParams[i] = [];
        }
        errorLog[0] = `Resource ${this.resource.resourceAsObject.resourceType} is INVALID`;
        errorLog[1] = `Amount of found errors: ${this.errors.length}`;
        for(let i = 0; i < this.errors.length; i++) {
            arrayOfErrorsParams[0][i] = this.errors[i].params;
            arrayOfErrorsParams[1][i] = `Error message: ${this.errors[i].dataPath} ${this.errors[i].message}`;
            arrayOfErrorsParams[2][i] = `Data path: ${this.errors[i].dataPath}`;
            arrayOfErrorsParams[3][i] = `Schema path: ${this.errors[i].schemaPath}`;
            arrayOfErrorsParams[4][i] = `Error keyword: ${this.errors[i].keyword}`;
        }
            errorLog[2] = arrayOfErrorsParams;
        return errorLog;
    }

    /**
     * Displays log error into a console
     */
    logIntoConsole() {
        console.log(this.errorLog[0]);
        console.log(this.errorLog[1]);
        for(let i = 0; i < this.errorLog[2][0].length; i++) {
            console.log(this.errorLog[2][1][i]);
            console.log(this.errorLog[2][0][i]);
            console.log(this.errorLog[2][2][i]);
            console.log(this.errorLog[2][3][i]);
            console.log(this.errorLog[2][4][i]);
        }
        console.log('');
        console.log('Visit https://www.hl7.org/fhir/resourcelist.html for more information');
    }

    /**
     * Creates log file for validation errors(log4js API is used here)
     */
    logIntoFile() {
        const log4js = require('log4js');
        const config = getObjectFromFile(__dirname + '/conf/Conf.json');
        log4js.configure({
            appenders: { ValidationError: { type: 'file', filename: `${config.pathToLogDirectory}/validationErrors.log` } },
            categories: { default: { appenders: ['ValidationError'], level: 'error' } }
        });
        const logger = log4js.getLogger('ValidationError');
        logger.error(this.errorLog[0]);
        logger.error(this.errorLog[1]);
        for(let i = 0; i < this.errorLog[2][0].length; i++) {
            logger.error(this.errorLog[2][1][i]);
            logger.error(this.errorLog[2][0][i]);
            logger.error(this.errorLog[2][2][i]);
            logger.error(this.errorLog[2][3][i]);
            logger.error(this.errorLog[2][4][i]);
        }
    }
}
module.exports = Logger;
