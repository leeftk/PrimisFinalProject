pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";


contract SimpleStorage is Ownable{
  uint storedData;

//bytes32 public proof;

uint public proofCount = 0;

event LogProofs(address adress, bytes32 proof);

mapping(uint => proof) public proofs;

struct proof {
    bytes32 hash;
    uint proofcount;
    // uint price;
    // bool purchased;
    // address payable buyer;
    // address payable seller;
  
 }

 // store a proof of existence in the contract state
    function notarize(string memory ipfshash ) public {
        bytes32 proofhash = hash(ipfshash);
        uint id = proofCount++;
        proofs[proofCount] = proof({hash: proofhash, proofcount:id });
        emit LogProofs(msg.sender, proofhash);
        
    }
    function hash(string memory ipfshash) internal view returns (bytes32){
      return sha256(abi.encodePacked(ipfshash));
    }

    function getProof(uint _proofcount)  public view onlyOwner returns(bytes32)  {
      return proofs[_proofcount].hash;
      
    }
}

