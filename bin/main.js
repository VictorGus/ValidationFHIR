(function() {
    var cli, colors, err, pkg, program, Validation;
    program = require("commander");
    pkg = require("../package.json");
    colors = require("colors");
    cli = require('node-cli-boilerplate');
    Validation = require('../validator.js');
    const validation = new Validation();
    program.version(pkg.version)
        .option('-r, --resource [resource]', 'set resource to be validated.');
    program.on("—help", function() {
        console.log("Examples:");
        console.log("");
        console.log(" $ " + "cli" + " --resource ./Resources/claim.json");
    });
    program.parse(process.argv);
    if (process.argv.length === 2) {
        program.help();
    } else {
        const result = `${validation.validateResource(program.resource)}`;
        try {
            cli.print({
                message: result 
            });
        } catch (_error) {
            err = _error;
            console.log("[", "node-cli-boilerplate".white, "]",       err.toString().red);
        }
    }
}).call(this);
