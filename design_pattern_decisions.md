The design pattern for this project was chosen with simplicity in mind. The goal was to hash an string, and then store that string in a mapping with a retrievable id. The idea for the contract was to keep it as low level as possible to decrease the likelyhood of any common attacks. Since only one function is writing to the blockchain it allows for a much safer and easy to use contract.

The contract uploads a hash to the ipfs network. This hash is then hashed and stored as a reference in the smart contract. 

Logs were used to produce a way to attach the hashes to a specific address.

The logs allow us to search the blockchain for hashes associated with a specifc address.
