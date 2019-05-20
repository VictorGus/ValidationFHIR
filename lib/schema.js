const getObjectFromFile = require('./data.js');

/**
 * Represents a FHIR schema as object with two attributes, namely, schema as object and schema as array of object keys(depending on resource)
 *
 * @author VictorGus
 * @version 1.0
*/
class ValidationSchema {

    /**
     * @constructor gets path to validation schema from configuration file 
     */
    constructor() {
        const jsonObject = getObjectFromFile(__dirname + '/conf/Conf.json');
        this.schemaAsObject = getObjectFromFile(__dirname + jsonObject.pathToSchema);
    }

    /**
     * Sets value for attribute schemaAsArrayOfKeys
     * @see FHIRValidation(validator.js)
     * @param resourceToBeValidated is FHIR resource for validation 
     */
    setSchemaAsArrayOfKeys(resourceToBeValidated) {
        this.schemaAsArrayOfKeys = this.schemaToArrayOfKeys(this.schemaAsObject, resourceToBeValidated);  
    }


    /**
     * Converts schema from object to object keys depending what resource is on validation
     *
     * @param {Object} schema  validation schema
     * @param {Object} resource validation resource
     * @returns {Object} array of keys for schema
     */
    schemaToArrayOfKeys(schema, resource) {
        if(typeof schema == "object" && (schema.$schema || schema.definitions)) {
                return Object.keys(schema.definitions[`${resource.resourceAsObject.resourceType}`].properties);
        } else {
            throw new this.InvalidArgument();
        }
    }

    InvalidArgument(message) {
        this.name = 'InvalidSchemaArgument';
        this.message = message || "Input argument is supposed to be schema";
        this.stack = (new Error()).stack;
    }
}

module.exports = ValidationSchema;
