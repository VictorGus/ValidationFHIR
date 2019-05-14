const fileSystem = require('fs');
function getObjectFromFile (pathToFile) {
    const jsonFile = fileSystem.readFileSync(pathToFile);
    const jsonObject = JSON.parse(jsonFile);
}
module.exports = getObjectFromFile;
