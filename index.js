var Ajv = require('ajv');
const fs = require('fs');
var ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
console.time("Execution time");
const jsonFile = fs.readFileSync("/home/victor/Downloads/fhir.schema.json");
const schema = JSON.parse(jsonFile);

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
    for(let i = 0; i < unrecordedErrors.length; i++) {
        recordedErrors.push(unrecordedErrors[i]);
    }
    return recordedErrors;
}

function findUnrecordedErrors(resource, schema, arrayOfErrors) {
    var errorParams = [];
    for(let i = 0; i < arrayOfErrors.length; i++) {
        errorParams[i] = arrayOfErrors[i].params.additionalProperty;
    }
    return resource.filter(property => !schema.includes(property) && !errorParams.includes(property)); 
}

const resourceJSON = fs.readFileSync('/home/victor/Documents/Diploma/FHIR validation app/Resources/claim.json');
const resourceToBeValidated = JSON.parse(resourceJSON);
var validate = ajv.addSchema(schema).compile(schema);
var valid = validate(resourceToBeValidated);
console.log(valid);
if(!valid) {
    var uniqueErrors = new Map();
    for(let i = 0; i < validate.errors.length; i++) {
        if(validate.errors[i].params.additionalProperty &&
           !Object.keys(schema.definitions[`${resourceToBeValidated.resourceType}`].properties).includes(validate.errors[i].params.additionalProperty) && !uniqueErrors.has(validate.errors[i].params.additionalProperty)) { 
            uniqueErrors.set(validate.errors[i].params.additionaLProperty, validate.errors[i]);
        }
    }
    console.log(uniqueErrors.values());
}
console.timeEnd("Execution time");
console.log(findUnrecordedErrors(resourceToArrayOfKeys(resourceToBeValidated), schemaToArrayOfKeys(schema, resourceToBeValidated), getUniqueErrors(validate.errors)));
