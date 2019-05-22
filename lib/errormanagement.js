const getObjectFromFile = require('./data.js');

/**
 * This class is used for handling validation errors
 *
 * @author VictorGus
 * @version 1.0
 */
class ValidationErrorManager {

    /**
     * @constructor creates instance of ValidationErrorManager
     * @param {Object} arrayOfErrors is array of validation errors
     * @param {Object} schema is validation schema
     * @param {Object} resource is FHIR resource on validation
     */
    constructor(arrayOfErrors, schema, resource) {
        if(Array.isArray(arrayOfErrors)) {
            this.arrayOfErrors = this.filterErrors(arrayOfErrors, schema);
        }
        this.schema = schema;
        this.resource = resource;
        const config = getObjectFromFile(__dirname + '/conf/Conf.json');
        if(config.showAllErrors && Array.isArray(arrayOfErrors)) {
            this.unrecordedErrors = this.findUnrecordedErrors(resource, schema, arrayOfErrors);
            this.arrayOfErrors = this.addUnrecordedErrors(this.arrayOfErrors);
        }
    }

    /**
     * Removes identical errors from input array of errors(it fixes issues with AJV errors output that contains identical errors)
     * @param {Object} arrayOfErrors
     * @param comp something for comparison
     */
    getUniqueErrors(arrayOfErrors, comp) {
        const unique = arrayOfErrors
              .map(e => e[comp])     // store the keys of the unique objects
              .map((e, i, final) => final.indexOf(e) === i && i)     // eliminate the dead keys & store unique objects
              .filter(e => arrayOfErrors[e]).map(e => arrayOfErrors[e]);
        return unique;
    }

    /**
     * Filters array of errors and compose a new array of errors(it fixes issues with AJV errors output) 
     * Removes not proper errors
     *
     * @param {Object} arrayOfErrors
     * @param {Object} schemaKeys is array of schema object keys
     * @returns {Object} new array of errors(correct and proper)
     */
    filterErrors(arrayOfErrors, schemaKeys) {
        var filteredArray = arrayOfErrors;
        return this.getUniqueErrors(filteredArray.filter(element => !schemaKeys.includes(element.params.additionalProperty) && element));
    }

    /**
     * Searches for unrecorded errors(errors that AJV could miss)
     *
     * @param {Object} resourceKeys is array of validation resource object keys
     * @param {Object} schema is array of schema object keys
     * @param {Object} arrayOfErrors
     * @returns {Object} array of unrecorded errors if they were(at this moment works only with additionalProperty errors)
     */
    findUnrecordedErrors(resourceKeys, schema, arrayOfErrors) {
        var errorParams = [];
        for(let i = 0; i < arrayOfErrors.length; i++) {
            errorParams[i] = arrayOfErrors[i].params.additionalProperty;
        }
        const filteredParams = resourceKeys.filter(property => !schema.includes(property) && !errorParams.includes(property) && property);
        if(filteredParams.length > 0)  {            
            return this.createValidationError('should NOT have additional properties', 'additionalProperties', 'additionalProperty', filteredParams);
        } else {
            return [];
        }
    }

    /**
     * Adds unrecorded errors to recorded errors array
     *
     * @param {Object} recordedErrors array of recorded errors
     * @returns {Object} new array of recorded errors containing unrecorded errors as well
     */
    addUnrecordedErrors(recordedErrors) {
        if(this.unrecordedErrors.length > 0) {
            for(let i = 0; i < this.unrecordedErrors.length; i++) {
                recordedErrors.push(this.unrecordedErrors[i]);
            }
        }
        return recordedErrors;
    }

    /**
     * Creates new error with the same structure as AJV has
     *
     * @param {String} newMessage validation error message
     * @param {String} errorType validation error type(keyword) e.g. additionalProperty
     * @param {Object} errorParam validation error parameter/parameters
     * @param {Object} invalidObject indicates what is not valid in resource properties
     * @returns {Object} new error
     */
    createValidationError(newMessage, errorType, errorParam,  invalidObject) {
        if(Array.isArray(invalidObject)) {
            var temp = [];
            var arrayOfErrors = [];
            for(let i in invalidObject) {
                arrayOfErrors[i] = {
                    keyword: errorType,
                    dataPath: '',
                    schemaPath: `#/${errorType}`,
                    message: newMessage
                }
                temp[i]={};
                temp[i][`${errorParam}`] = invalidObject[i];
                arrayOfErrors[i]['params'] = temp[i];
            }
            return arrayOfErrors;
        } else {
            var newValidationError = {
                keyword: errorType,
                dataPath: '',
                schemaPath: `#/${errorType}`,
                message: newMessage
            }
            const temp = {};
            temp[`${errorParam}`] = invalidObject;
            newValidationError['params'] = temp;
            return newValidationError;
        }
    }
}
module.exports = ValidationErrorManager;
