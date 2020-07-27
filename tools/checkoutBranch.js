
const execute = require('./execute');
const abort = require('./abort');

/**
 * 
 * @param {string} branch 
 */
async function checkRemoteBranchExist(branch) {
    let hasRemoteBranch = '';

    try {
        await execute(`git fetch`);
        hasRemoteBranch = await execute(`git ls-remote origin ${ branch }`);
    } catch (e) {
        return false;
    }

    return !!hasRemoteBranch;
}

/**
 * 
 * @param {string} branch 
 */
async function checkLocalBranchExist(branch) {
    let hasLocalBranch = '';

    try {
        hasLocalBranch = await execute(`git rev-parse --symbolic-full-name --verify --quiet ${ branch }`);
    } catch (e) {
        return false;
    }

    return !!hasLocalBranch;
}

module.exports = async (branchName, fromBranch=null) => {

    if(!branchName) {
        abort('No branch name given');
        return;
    }

    // Check if local  branch exists
    const hasLocalBranch = await checkLocalBranchExist(branchName);
    // Check if remote  branch exists
    const hasRemoteBranch = await checkRemoteBranchExist(branchName);

    // Switch to  branch
    try {
        if(hasLocalBranch) {
            // There is a local branch, use it
            await execute(`git checkout ${ branchName }`);
        } else if(hasRemoteBranch) {
            // No local but a remote branch, checkout and track remote
            await execute(`git checkout --track origin/${ branchName }`);
        } else {
            // No local or remote branch, create new
            if(fromBranch) {
                const hasLocalFromBranch = await checkLocalBranchExist(fromBranch);

                if(hasLocalFromBranch) {
                    await execute(`git checkout ${ fromBranch }`);
                }
            }
            
            await execute(`git checkout -b ${ branchName }`);
        }
    } catch (e) {
        console.log(e);
    }

    if(hasRemoteBranch) {
        // Maybe not?
        try {
            // await execute(`git pull`);
        } catch (e) {}
    }
}
