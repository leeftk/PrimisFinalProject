pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;

bytes32 public proof;
  
  
 // store a proof of existence in the contract state
    function notarize(string memory ipfshash ) public {
        proof = hash(ipfshash);
    }
    function hash(string memory ipfshash) internal view returns (bytes32){
      return sha256(abi.encodePacked(ipfshash));
    }
}

