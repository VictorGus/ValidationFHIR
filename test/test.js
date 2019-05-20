var assert = require('assert');
const validation = {};
before(function(){    
    const Validation = require('../validator.js');
    const validation = new Validation();
})

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
