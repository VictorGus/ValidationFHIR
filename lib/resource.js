class Resource {

    constructor(resource) {
        this.resource = resource;
        this.resourceAsArrayOfKeys = this.resourceAsArrayOfKeys(resource); 
    }

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
