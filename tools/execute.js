const { exec } = require('child_process');
const chalk = require('chalk');

/**
 * Promisified exec command
 *
 * @param {String} command
 * @param {Boolean} silent No logging
 * @param {Boolean} dry If true, command will not be called, only logged.
 * @returns
 */
module.exports = function(command, silent=false, dry=false) {

    if(!silent) {
        console.log(chalk.grey(command));
    }

    return new Promise((resolve, reject) => {
        if(dry) {
            setTimeout(resolve, 100);
        } else {
            exec(command, (error, stdout, stderr) => {
                
                if(error) {
                    reject(error);
                    return;
                }
                
                if(stderr) {
                    resolve(stderr);
                    return;
                }
                
                resolve(stdout);
            });
        }
    });
}
