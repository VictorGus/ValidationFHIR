const getObjectFromFile = require('./data.js');
class Logger {

    constructor(errors, resource) {
        this.errors = errors;
        this.resource = resource;
        this.errorLog = this.log();
    }

    log() {
        var errorLog = [];
        var arrayOfErrorsParams = [];
        arrayOfErrorsParams[0] = [];
        arrayOfErrorsParams[1] = [];
        arrayOfErrorsParams[2] = [];
        arrayOfErrorsParams[3] = [];
        arrayOfErrorsParams[4] = [];
        errorLog[0] = `Resource ${this.resource.resourceAsObject.resourceType} is invalid`;
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

    logIntoConsole() {
        console.log(this.errorLog[0]);
        console.log('Visit https://www.hl7.org/fhir/resourcelist.html for more information');
        console.log(this.errorLog[1]);
        for(let i = 0; i < this.errorLog[2][0].length; i++) {
            console.log(this.errorLog[2][0][i]);
            console.log(this.errorLog[2][1][i]);
            console.log(this.errorLog[2][2][i]);
            console.log(this.errorLog[2][3][i]);
            console.log(this.errorLog[2][4][i]);
        }
    }
}

module.exports = Logger;
