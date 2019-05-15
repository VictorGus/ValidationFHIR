const getObjectFromFile = require('./data.js');

class ValidationSchema {

    constructor() {
        const jsonObject = getObjectFromFile('./lib/conf/Conf.json');
        this.schemaAsObject = getObjectFromFile(jsonObject.pathToSchema);
    }

    setSchemaAsArrayOfKeys(resourceToBeValidated) {
        this.schemaAsArrayOfKeys = this.schemaToArrayOfKeys(this.schemaAsObject, resourceToBeValidated);  
    }

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
