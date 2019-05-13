class ValidationSchema {

    constructor(schema, resourceToBeValidated) {
        this.schema = schema;
        this.schemaAsArrayOfKeys = this.schemaToArrayOfKeys(schema, resourceToBeValidated);  

    }

    schemaToArrayOfKeys(schema, resource) {
        if(typeof schema == "object" && (schema.$schema || schema.definitions)) {
            return Object.keys(schema.definitions[`${resource.resourceType}`].properties);
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
