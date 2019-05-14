class ConfiguratorAJV {

    constructor(draft = 6, allErrors) {
        const Ajv = require('ajv');
        if(allErrors == true) {
            var ajv = new Ajv({allErrors: true});
        } else {
            var ajv = new Ajv();
        }
        if (draft == 6) {
            ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
        }
        this.ajv = ajv;
    }
}
module.exports = ConfiguratorAJV;
