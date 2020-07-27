const execute = require('./execute');
const checkoutBranch = require('./checkoutBranch');

// Build
await execute(`npm run build`);

// Switch branch
await checkoutBranch(`gh-pages`, 'master');

// Move from dist to root
