/**
 * Represents a FHIR resource as object with two attributes, namely, resource as array of keys and resource as object
 *
 * @author VictorGus
 * @version 1.0
 */
class Resource {

    /**
     * @constructor creates instance of Resource object
     * @param {Object} resource is resource on validation
     */
    constructor(resource) {
        this.resourceAsObject = resource;
        this.resourceAsArrayOfKeys = this.resourceToArrayOfKeys(resource); 
    }

    /**
     * Converts resource from object to array of object keys
     * @param {Object} resource is resource on validation
     */
    resourceToArrayOfKeys(resource) {
        if(typeof resource == "object") {
            return Object.keys(resource);
        } else {
            throw new this.InvalidArgument('Input argument is supposed to be resource');
        }
    }

    InvalidArgument(message) {
        this.name = 'InvalidSchemaArgument';
        this.message = message || "Input argument is supposed to be schema";
        this.stack = (new Error()).stack;
    }
}

module.exports = Resource;
