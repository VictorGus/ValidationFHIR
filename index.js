var Ajv = require('ajv');
const fs = require('fs');
var ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
console.time("Execution time");
const jsonFile = fs.readFileSync("/home/victor/Downloads/fhir.schema.json");
const schema = JSON.parse(jsonFile);

const testResource = {
    resourceType:"Patient"
};

const resourceJSON = fs.readFileSync('/home/victor/Documents/Diploma/FHIR validation app/Resources/patient.json');
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

console.log(validate.errors.length);
for(let i = 0; i < validate.errors.length; i++) {
    if(validate.errors[i].message != 'should NOT have additional properties') {
        console.log(validate.errors[i]);
    }
}
console.timeEnd("Execution time");
