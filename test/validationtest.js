var assert = require('assert');
var Validation = require('../validator.js');
const validation = new Validation();

   describe('#validateResource()', function() {
        it('should return false when resource is not valid', function() {
            assert.equal(validation.validateResource(__dirname + '/Cases/Resources/claim.json'), false);
        }).timeout(2500);
       it('should return true when resource is valid', function() {
           assert.equal(validation.validateResource(__dirname + '/Cases/Resources/patient.json'), true);
       }).timeout(2500);
    });
