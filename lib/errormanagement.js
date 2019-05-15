const getObjectFromFile = require('./data.js');

class ValidationErrorManager {
    constructor(arrayOfErrors, schema, resource) {
        this.arrayOfErrors = this.filterErrors(arrayOfErrors, schema);
        this.schema = schema;
        this.resource = resource;
        const config = getObjectFromFile('./lib/conf/Conf.json');
        if(config.showAllErrors) {
            this.unrecordedErrors = this.findUnrecordedErrors(resource, schema, arrayOfErrors);
            this.arrayOfErrors = this.addUnrecordedErrors(this.arrayOfErrors);
        }
    }

    getUniqueErrors(arrayOfErrors, comp) {
        const unique = arrayOfErrors
              .map(e => e[comp])     // store the keys of the unique objects
              .map((e, i, final) => final.indexOf(e) === i && i)     // eliminate the dead keys & store unique objects
              .filter(e => arrayOfErrors[e]).map(e => arrayOfErrors[e]);
        return unique;
    }

    filterErrors(arrayOfErrors, schemaKeys) {
        var filteredArray = arrayOfErrors;
        return this.getUniqueErrors(filteredArray.filter(element => !schemaKeys.includes(element.params.additionalProperty) && element));
    }

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

    addUnrecordedErrors(recordedErrors) {
        if(this.unrecordedErrors.length > 0) {
            for(let i = 0; i < this.unrecordedErrors.length; i++) {
                recordedErrors.push(this.unrecordedErrors[i]);
            }
        }
        return recordedErrors;
    }

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

