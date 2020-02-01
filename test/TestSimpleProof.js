
const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const {
  catchRevert
} = require('../utils/helpers');


contract("SimpleStorage", accounts => {
  it("creates a hash, verifies hash is not equal to 0", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Hashes a file
    await simpleStorageInstance.notarize("hi", { from: accounts[0] });

    // Gets the proof
    const proof = await simpleStorageInstance.getProof.call(0);

    assert.notEqual(proof, "0x0000000000")

  });


  it("proofCount should equal 1", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

  

    // Gets the proof count
    const proofCount = await simpleStorageInstance.proofCount.call();



    assert.equal(proofCount, 1 );
    

  });


  it('should revert if duplicate proof exists ', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
  
    //await simpleStorageInstance.notarize("hi", { from: accounts[1] });
    
    catchRevert(await simpleStorageInstance.notarize("hi", { from: accounts[0] }))
    //await catchRevert(simpleStorageInstance.notarize("hi", { from: accounts[0] }));
  });


  it('should revert if duplicate proof exists ', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
  
    //await simpleStorageInstance.notarize("hi", { from: accounts[1] });
    sha256 = require('js-sha3').sha256;
    const hash = await SimpleStorage.notarize("hi",{from : accounts[0]});

    assert.equal(hash, "0x" + sha256(hash),"The hash of the document and the cal should eqaulß")
    //await catchRevert(simpleStorageInstance.notarize("hi", { from: accounts[0] }));
  });


});


