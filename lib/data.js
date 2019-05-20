const fileSystem = require('fs');
/**
 * Receives path to local JSON file and converts it into JavaScript object
 * @param {String} pathToFile is a string that contains path to local JSON file
 * @returns {Object} result of file parsing
 * @author VictorGus
 * @version 1.0
 */
function getObjectFromFile (pathToFile) {
    const jsonFile = fileSystem.readFileSync(pathToFile);
    return jsonObject = JSON.parse(jsonFile);
}
module.exports = getObjectFromFile;
