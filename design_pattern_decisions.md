#Hashing Design
The design pattern for this project was chosen with simplicity in mind. The contracat uses hashing to reference a certain transaction with its relative ipfs hash.The hashes of documents are created using the `sha256` function.

#Contract Design

The contract uploads a hash to the ipfs network. This hash is then hashed and stored as a reference in the smart contract. 

Logs were used to produce a way to attach the hashes to a specific address.

The logs allow us to search the blockchain for hashes associated with a specifc address.
