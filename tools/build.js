const execute = require('./execute');
const checkoutBranch = require('./checkoutBranch');

async function run() {
	await execute(`npm run build`);
	await checkoutBranch(`gh-pages`, 'master');
    await execute(`git add .`);
	await execute(`git commit -m "Add bundled files"`);
	await execute(`git push`);
}

run();
