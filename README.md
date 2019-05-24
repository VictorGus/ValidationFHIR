# Validator of FHIR resources
### for Node.js  
[![Build Status](https://travis-ci.org/VictorGus/ValidationFHIR.svg?branch=master)](https://travis-ci.org/VictorGus/ValidationFHIR)

<addr> Validates FHIR resources using a FHIR JSON schema. See [hl7.org/fhir/validation.html](https://www.hl7.org/fhir/validation.html) for more information about FHIR validation.

<addr>This module uses [Ajv](https://github.com/epoberezkin/ajv) JSON schema validator. json-schema-resource-validation provides good perfomance and it can be easily integrated into your based on FHIR Node Js project.  

**PLEASE NOTE**:

* <addr>This validation module works with draft-06 and draft-07 JSON schemas(draft-06 is recommended).

* <addr>Using custom validation schemas(not the one presented on [hl7.org/fhir/validation.html](https://www.hl7.org/fhir/validation.html)) is not recommended

* Current version 1.0.3 works with FHIR v4.0.0 resources ONLY

## Getting started
***
<addr> _Firstly you need to instal npm package_ :

`` npm install json-schema-resource-validation ``

<addr> _Creation of validation instance looks like this_ :

```
const ResourceValidation = require('json-schema-resource-validation');
const resourceValidation = new ResourceValidation();
```
<addr> _Use of FHIR validator with ``object`` type input parameter_ :
```
const ResourceValidation = require('json-schema-resource-validation');
const resourceValidation = new ResourceValidation();
const resourcePatient = {
  "resourceType": "patient"
};
resourceValidation.validateResource('resourcePatient');
```
**NOTE:**
<addr> *``.validateResource()`` has ``object`` type input parameter or ``string`` type input parameter(path to JSON file on your local machine)*

<addr> _* ``string`` type input parameter: *_
```
const ResourceValidation = require('json-schema-resource-validation');
const resourceValidation = new ResourceValidation();
resourceValidation.validateResource('/home/username/Resources/bundle.json');
```

<addr> If resource is valid ``.validateResource()`` will return ```true```and ```false``` if invalid.



<addr> If resource is invalid you can get log of validation errors it's stored in ``.log`` _property_ of validation instance.

** Moreover: **
<addr>_You can output validation error log into console or log file by using additional input parameters for ``.validateResource()``._

_** Output into console: **_
```
const ResourceValidation = require('json-schema-resource-validation');
const resourceValidation = new ResourceValidation();
resourceValidation.validateResource('/home/username/Resources/patient.json', true);
```
_Result:_
![image](https://user-images.githubusercontent.com/43377382/58316745-ed7bac00-7e1c-11e9-8756-2c03511a0362.png)

<addr> _** Output into file: **_
```
const ResourceValidation = require('json-schema-resource-validation');
const resourceValidation = new ResourceValidation();
resourceValidation.validateResource('/home/username/Resources/claim.json', false, true);
```
_Result:_
![image](https://user-images.githubusercontent.com/43377382/58317215-059ffb00-7e1e-11e9-8b08-c6dbe6b93958.png)

## How to configure resource validator
***
<addr> Resource validator can be configured via configuration file, which is located ``/path_to_your_project/node_modules/json-schema-resource-validation/lib/conf/Conf.json``
<addr> Its content:
```
{
    "pathToSchema": "/fhir-schemas/fhir.schema.json",
    "schemaDraft": 6,
    "showAllErrors": false,
    "pathToLogDirectory": "./logs",
    "logErrorsIntoFile": true,
    "logErrorsIntoConsole": true
}
```
As you can see, log settings, validation schema, schema draft can be set via this file.

** NOTE: **
* By deffault validator outputs only one error of the whole error array
* You can output the whole array switching ``showAllErrors`` to ``true``(for v1.0.3 it works only with additional property errors)
