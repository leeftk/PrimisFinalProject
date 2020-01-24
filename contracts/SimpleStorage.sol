pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";


contract SimpleStorage is Ownable{
  uint storedData;

//bytes32 public proof;

uint public proofCount = 0;

 /** @notice Logs when a proof is created
      */
event LogProofs(address adress, bytes32 proof);
 /** @dev Maps id to the proof given from hash function 
      */
mapping(uint => proof) public proofs;

struct proof {
    bytes32 hash;
    uint proofcount;
    // uint price;
    // bool purchased;
    // address payable buyer;
    // address payable seller;
  
 }

 /** @notice stores a reference in proofs mapping of ipfshash
      * @dev emits a log with info of the sender and the hash
      * @param ipfshash is the hash that is created from ipfs
      */
    function notarize(string memory ipfshash ) public {
        bytes32 proofhash = hash(ipfshash);
        uint id = proofCount++;
        proofs[proofCount] = proof({hash: proofhash, proofcount:id });
        emit LogProofs(msg.sender, proofhash);
        
    }
    /** @notice helper function that hashes an input
      * @param ipfshash is the hash that is created from ipfs
      */
    function hash(string memory ipfshash) internal view returns (bytes32){
      return sha256(abi.encodePacked(ipfshash));
    }
    /** @notice gets proof from blockchain
      * @param proofcount is the id of the proof you want to retrieve
      * @return return the proof from mapping
      */
    function getProof(uint _proofcount)  public view onlyOwner returns(bytes32)  {
      return proofs[_proofcount].hash;
      
    }
}

