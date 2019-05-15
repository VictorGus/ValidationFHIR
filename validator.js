const JsonSchema = require('./lib/schema.js');
const Resource = require('./lib/resource.js');
const AjvConfigurator = require('./lib/ajvconnector.js');
const getObjectFromFile = require("./lib/data.js");
const ValidationErrorManager = require('./lib/errormanagement.js');
const Logger = require('./lib/logger.js');

function validateResource(pathToResource) {
    const isResourceTypeValid = (schema, resource) => {
        const definitions = Object.keys(schema.schemaAsObject.definitions);
        if(resource.resourceAsArrayOfKeys.includes('resourceType')){
            return definitions.includes(resource.resourceAsObject.resourceType); 
        } else {
            return false;
        }
    } 

    const resource = getObjectFromFile(pathToResource);
    const resourceToBeValidated = new Resource(resource);
    const ajvConfigurator = new AjvConfigurator();
    const schema = new JsonSchema(resourceToBeValidated.resourceAsObject);
    if(ajvConfigurator.ajv.validateSchema(schema.schemaAsObject)) {
        if(isResourceTypeValid(schema, resourceToBeValidated)) {
            schema.setSchemaAsArrayOfKeys(resourceToBeValidated);
            const validate = ajvConfigurator.ajv.addSchema(schema.schemaAsObject).compile(schema.schemaAsObject);
            const isValid = validate(resourceToBeValidated.resourceAsObject);
            if(isValid) {
                console.log(`Resource ${resourceToBeValidated.resourceAsObject.resourceType} is valid`);
                return isValid;
            } else {
                const validationErrorManager = new ValidationErrorManager(validate.errors, schema.schemaAsArrayOfKeys, resourceToBeValidated.resourceAsArrayOfKeys);
                const logger = new Logger(validationErrorManager.arrayOfErrors, resourceToBeValidated);
                logger.logIntoConsole();
                return isValid;
            }
        } else {
            const logger = new Logger();
            console.log(`Resource is invalid - resourceType property is required`);
            return false;
        }
    } else {
        console.log('Schema is invalid');
        return false;
    }
}

validateResource('/home/victor/Documents/Diploma/FHIR validation app/Resources/claim.json');

module.exports = validateResource;
