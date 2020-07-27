const execute = require('./execute');
const checkoutBranch = require('./checkoutBranch');

async function run() {
	await execute(`npm run build`);
	const switched = await checkoutBranch(`gh-pages`, 'master');

	if(switched) {
		await execute(`git add .`);
		await execute(`git commit -m "Add bundled files"`);
		// await execute(`git push`);
	}
}

run();
