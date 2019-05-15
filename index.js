var Ajv = require('ajv');
const fs = require('fs');
var ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
console.time("Execution time");
const jsonFile = fs.readFileSync("/home/victor/Documents/Diploma/JSON schema validation/fhir-schemas/fhir.schema.json");
const schema = JSON.parse(jsonFile);


const isResourceTypePresented = (resourceProperties) => resourceProperties.includes('resourceType');

function createValidationError(newMessage, errorType, errorParam,  invalidObject) {
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

function InvalidArgument(message) {
    this.name = 'InvalidSchemaArgument';
    this.message = message || "Input argument is supposed to be schema";
    this.stack = (new Error()).stack;
}

function getUniqueErrors(arrayOfErrors, comp) {
    const unique = arrayOfErrors
          .map(e => e[comp])     // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)     // eliminate the dead keys & store unique objects
          .filter(e => arrayOfErrors[e]).map(e => arrayOfErrors[e]);
    return unique;
}

function schemaToArrayOfKeys(schema, resource) {
    if(typeof schema == "object" && (schema.$schema || schema.definitions)) {
        return Object.keys(schema.definitions[`${resource.resourceType}`].properties);
    } else {
        throw new InvalidArgument();
    }
}

function resourceToArrayOfKeys(resource) {
    if(typeof resource == "object") {
        return Object.keys(resource);
    } else {
        throw new InvalidArgument('Input argument is supposed to be resource');
    }
}

function addUnrecordedErrors(unrecordedErrors, recordedErrors) {
    if(unrecordedErrors.length > 0) {
    for(let i = 0; i < unrecordedErrors.length; i++) {
        recordedErrors.push(unrecordedErrors[i]);
     }
    }
    return recordedErrors;
}

function findUnrecordedErrors(resourceKeys, schema, arrayOfErrors) {
    var errorParams = [];
    for(let i = 0; i < arrayOfErrors.length; i++) {
        errorParams[i] = arrayOfErrors[i].params.additionalProperty;
    }
    const filteredParams = resourceKeys.filter(property => !schema.includes(property) && !errorParams.includes(property) && property);
    if(filteredParams.length > 0)  {
        return createValidationError('should NOT have additional properties', 'additionalProperties', 'additionalProperty', filteredParams);
    } else {
        return 0;
    }
}

function filterErrors(schemaKeys, arrayOfErrors) {
    var filteredArray = getUniqueErrors(arrayOfErrors);
    return filteredArray.filter(element => !schemaKeys.includes(element.params.additionalProperty) && element);
}

const resourceJSON = fs.readFileSync('/home/victor/Documents/Diploma/FHIR validation app/Resources/claim.json');
var validate = ajv.addSchema(schema).compile(schema);
const resourceToBeValidated = JSON.parse(resourceJSON);
var valid = validate(resourceToBeValidated);
if (!valid) {
    //validate.errors = filterErrors(schemaToArrayOfKeys(schema, resourceToBeValidated), validate.errors);
    for(let i = 0; i < validate.errors.length; i++) {
        if(validate.errors[i].message != 'should NOT have additional properties') {
            console.log(validate.errors[i]);
        }
    }
    // console.log(addUnrecordedErrors(findUnrecordedErrors(resourceToArrayOfKeys(resourceToBeValidated), schemaToArrayOfKeys(schema, resourceToBeValidated), validate.errors), validate.errors));
}
console.timeEnd("Execution time");
