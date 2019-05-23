var assert = require('assert');
var Validation = require('../validator.js');
const validation = new Validation();

describe('Validation correctness checking', function(){
   describe('#validateResource()', function() {
       it('should return true when Patient resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/patient.json', false), true);
       }).timeout(2500);

       it('should return true when Procedure resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/procedure.json', false), true);
       }).timeout(2500);

       it('should return true when Observation resource is valid', function() {
 
          assert.equal(validation.validateResource(__dirname + '/Cases/Resources/observation.json', false), true);
       }).timeout(2500);

       it('should return true when Bundle resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/bundle.json', false), true);
       }).timeout(2500);
       
       it('should return true when Orginization resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/organization.json', false), true);
       }).timeout(2500);

       it('should return true when MedicationRequest resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/medicationrequest.json', false), true);
       }).timeout(2500);

       it('should return true when DiagnosticReport resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/diagnosticreport.json', false), true);
       }).timeout(2500);

       it('should return true when Careplan resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/careplan.json', false), true);
       }).timeout(2500);

       it('should return true when Condition resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/condition.json', false), true);
       }).timeout(2500);

       it('should return true when Encounter resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/encounter.json', false), true);
       }).timeout(2500);

       it('should return true when Immunization resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/immunization.json', false), true);
       }).timeout(2500);

       it('should return true when Patient resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidpatient.json', false), false);
       }).timeout(2500);

       it('should return false when Claim resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/claim.json', false), false);
       }).timeout(2500);

       it('should return false when ServiceRequest resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/servicerequest.json', false), false);
       }).timeout(2500);

       it('should return false when Procedure resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidprocedure.json', false), false);
       }).timeout(2500);

       it('should return false when Observation resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidobservation.json', false), false);
       }).timeout(2500);

       it('should return false when MedicationRequest resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidmedicationrequest.json', false), false);
       }).timeout(2500);

       it('should return false when MedicationRequest resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidmedicationrequest.json', false), false);
       }).timeout(2500);

       it('should return false when ServiceRequest resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidservicerequest.json', false), false);
       }).timeout(2500);

       it('should return false when Bundle resource is not valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/invalidbundle.json', false), false);
       }).timeout(2500);

   });
});

describe('Validation error type correctness checking', function(){
    describe('#validateResource()', function() {
        it('should have validation error keyword additionalProperties', function(){
            validation.validateResource(__dirname + '/Cases/Resources/invalidbundle.json', false);
            assert.equal(validation.log[2][4][0],  "Error keyword: additionalProperties");
        })

        it('should have validation error keyword required', function(){
            validation.validateResource(__dirname + '/Cases/Resources/invalidobservation.json', false);
            assert.equal(validation.log[2][4][0],  "Error keyword: required");
        })

        it('should have validation error keyword required', function(){
            validation.validateResource(__dirname + '/Cases/Resources/invalidobservation.json', false);
            assert.equal(validation.log[2][4][0],  "Error keyword: required");
        })

        it('should have validation error keyword type', function(){
            validation.validateResource(__dirname + '/Cases/Resources/invalidorganization.json', false);
            assert.equal(validation.log[2][4][0],  "Error keyword: type");
        })

        it('should have validation error keyword enum', function(){
            validation.validateResource(__dirname + '/Cases/Resources/invalidpatient.json', false);
            assert.equal(validation.log[2][4][0],  "Error keyword: enum");
        })
    })
})
