class ValidationErrorManager {
    constructor(arrayOfErrors, schema, resource) {
        this.arrayOfErrors = this.getUniqueErrors(arrayOfErrors);
        this.schema = schema;
        this.resource = resource;
        this.unrecordedErrors = this.findUnrecordedErrors(resource, schema, arrayOfErrors);
    }

    getUniqueErrors(arrayOfErrors, comp) {
        const unique = arrayOfErrors
              .map(e => e[comp])     // store the keys of the unique objects
              .map((e, i, final) => final.indexOf(e) === i && i)     // eliminate the dead keys & store unique objects
              .filter(e => arrayOfErrors[e]).map(e => arrayOfErrors[e]);
        return unique;
    }

    filterErrors(schemaKeys) {
        var filteredArray = this.arrayOfErrors;
        this.arrayOfErrors = filteredArray.filter(element => !schemaKeys.includes(element.params.additionalProperty) && element);
        return this;
    }

    findUnrecordedErrors(resourceKeys, schema, arrayOfErrors) {
        var errorParams = [];
        for(let i = 0; i < arrayOfErrors.length; i++) {
            errorParams[i] = arrayOfErrors[i].params.additionalProperty;
        }
        const filteredParams = resourceKeys.filter(property => !schema.includes(property) && !errorParams.includes(property) && property);
        if(filteredParams.length > 0)  {
            return createValidationError('should NOT have additional properties', 'additionalProperties', 'additionalProperty', filteredParams);
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
        this.arrayOfErrors = recordedErrors;
        return this;
    }
}
module.exports = ValidationErrorManager;

