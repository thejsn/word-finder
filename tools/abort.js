const chalk = require('chalk');

/**
* Helper to stop program
* 
* @param {String} msg 
*/
module.exports = (msg) => {
   console.log('\n' + chalk.red.inverse(' ERROR ') + ' ' + msg + '\n');
   process.exit();
}
