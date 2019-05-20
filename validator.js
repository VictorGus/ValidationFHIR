const JsonSchema = require('./lib/schema.js');
const Resource = require('./lib/resource.js');
const AjvConfigurator = require('./lib/ajvconnector.js');
const getObjectFromFile = require("./lib/data.js");
const ValidationErrorManager = require('./lib/errormanagement.js');
const Logger = require('./lib/logger.js');

/**
 * Creates FHIR resource validator instance.
 * Constructor of FHIRValidation has no input params
 * @author VictorGus
 * @version 1.0
 */
class FHIRValidation{
/**
 * Validates resource in according to specified in configuration file FHIR schema
 * @this FHIRValidation
 * @param {String} or {object} inputResource specifies a path to resource or it is a JavaScript object that represents resource
 * @pa
ram {Boolean} logIntoConsole is optional parameter(can be specified by editing ./lib/Conf/conf.json file) determines will validation errors be shown in console
 * @param {Boolean} logIntoFile is optional parameter(can be specified by editing ./lib/Conf/conf.json file) determines will validation errors be logged into a file
 * @returns {Boolean} true in a case when input resource is valid and false when it is invalid 
 */
validateResource(inputResource, logIntoConsole = getObjectFromFile(__dirname + '/lib/conf/Conf.json').logErrorsIntoConsole,
                 logIntoFile = getObjectFromFile(__dirname + '/lib/conf/Conf.json').logErrorsIntoFile) {

    /**
     * Checks if input resource contains resourceType property and it presented correctly or not
     * @param {Object} schema is FHIR validation JSON schema
     * @param {Object} resource is FHIR resource that is being validated
     * @this validateResource
     */
    const isResourceTypeValid = (schema, resource) => {
        const definitions = Object.keys(schema.schemaAsObject.definitions);
        if(resource.resourceAsArrayOfKeys.includes('resourceType')) {
            return definitions.includes(resource.resourceAsObject.resourceType); 
        } else {
            return false;
        }
    }
    var resource = {};
    if(typeof inputResource != 'object' && typeof inputResource != "string") {
        throw new TypeError('Input argument is supposed to be object or string');
    }
    if(typeof inputResource == 'string') {
        resource = getObjectFromFile(inputResource);
    } else {
        resource = inputResource; 
    }
    const resourceToBeValidated = new Resource(resource);
    const ajvConfigurator = new AjvConfigurator();
    const schema = new JsonSchema(resourceToBeValidated.resourceAsObject);
    if(ajvConfigurator.ajv.validateSchema(schema.schemaAsObject)) {
        if(isResourceTypeValid(schema, resourceToBeValidated)) {
            schema.setSchemaAsArrayOfKeys(resourceToBeValidated);
            const validate = ajvConfigurator.ajv.addSchema(schema.schemaAsObject).compile(schema.schemaAsObject);
            const isValid = validate(resourceToBeValidated.resourceAsObject);
            if(isValid) {
                return isValid;
            } else {
                const validationErrorManager = new ValidationErrorManager(validate.errors, schema.schemaAsArrayOfKeys, resourceToBeValidated.resourceAsArrayOfKeys);
                const logger = new Logger(validationErrorManager.arrayOfErrors, resourceToBeValidated);
                if(logIntoConsole) {
                    logger.logIntoConsole();
                }
                if(logIntoFile) {
                    logger.logIntoFile();
                }
                this.log = logger.loggedErrors;
                return isValid;
            }
        } else {
            const validationErrorManager = new ValidationErrorManager(1, [], resourceToBeValidated.resourceAsArrayOfKeys);
            const missingProperty = [];
            missingProperty[0] = validationErrorManager.createValidationError('should have required property "resourceType"', 'required', 'missingProperty', 'resourceType');
            const logger = new Logger(missingProperty, resourceToBeValidated);
            if(logIntoFile) {
                logger.logIntoConsole();
            }
            if(logIntoConsole) {
               logger.logIntoConsole();
            }
            this.log = logger.loggedErrors;
            return false;
        }
    } else {
        console.log('Schema is invalid');
        return false;
    }
}
}
module.exports = FHIRValidation;
