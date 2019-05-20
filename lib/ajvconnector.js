const getObjectFromFile = require('./data.js');
const config = getObjectFromFile(__dirname + '/conf/Conf.json');

/**
 * Contains configuration for AJV JSON schema validator
 *
 * @author VictorGus
 * @version 1.0
 */
class ConfiguratorAJV {
    constructor(draft = config.schemaDraft) {
        const Ajv = require('ajv');
        var ajv = new Ajv();
        if (draft == 6) {
            ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
        }
        this.ajv = ajv;
    }
}

module.exports = ConfiguratorAJV;
