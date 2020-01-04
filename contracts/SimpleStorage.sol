pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;

bytes32 public proof;

uint public proofCount = 0;

mapping(uint => proof) public proofs;


 

  
 // store a proof of existence in the contract state
    function notarize(string memory ipfshash ) public {
        proof = hash(ipfshash);
        proofCount++;
        proof = proofs[proofCount];
    }
    function hash(string memory ipfshash) internal view returns (bytes32){
      return sha256(abi.encodePacked(ipfshash));
    }

    function getProof(uint _proofcount) public view returns(string){
      return proofs[_proofcount];
    }
}

