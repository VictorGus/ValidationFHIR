const fileSystem = require('fs');
function readFile (pathToFile) {
    console.log(pathToFile);
    const jsonFile = fileSystem.readFileSync(pathToFile);
    const jsonObject = JSON.parse(jsonFile);
    console.log(jsonObject);
}
module.exports = readFile;
