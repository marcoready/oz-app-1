// Load dependencies
const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

// Load compiled artifacts
const MMToken = contract.fromArtifact('MMToken');

// Start test block
describe('MMToken Users', function () {
    const [ owner, user ] = accounts;
    let userCount

    before(async function () {
        // Deploy a new MMToken contract
        this.contract = await MMToken.new({ from: owner });
        userCount = await this.contract.userCount()
    });

    it('register one user', async function () {
        const receipt = await this.contract.registerUser( { from: user});
        userCount = await this.contract.userCount()
        expect(userCount).to.be.bignumber.equal(new BN('1'));
        expectEvent(receipt, 'UserRegistered', { id: userCount, account: user });
    });

    it('list one user', async function () {
         // const user = await this.contract.users(user);
         // expect(user.account).to.be.equal(user);
    });

});


