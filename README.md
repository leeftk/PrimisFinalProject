# Primis

Overview

A Proof-of-Existence Marketplace
The goal of Primis is to anonymously and securely store proof of existence in the blockchain and to allow the resale of these proofs to other users in a decentralized and democratized means of exchange.


Common proof-of-existence methods already exist such as POEX.io which allows for a proof of a file to be stored in the bitcoin blockchain. This idea is useful when you want to prove a timestamp,demonstrating data ownership, and checking for integrity. While these three are extremely useful, it still leaves us with the same system we have today just in a digital format. Primis expands on this idea by allowing the exchange of these proofs in return for ETH. This allows more collaboration between community members and thus spurs innovation. Another benefit of this is actually attaching value to ideas and allowing the market to decide what an idea my be worth. The proofs can also be directly related to contracts in the real world. Allowing for endless possibilities of taking a contract and digitizing it to change how it is valued. Primis was built with the idea of proving firstness and thus creating value for those who can prove it. We will continue to build out Primis with this goal in mind in order to continue the integrity of innovation. 


# Installation

1. Clone the repo

2. Be sure to have Metamask installed

3. Be sure to have Ganache GUI installed

4. Be sure to have IPFS installed https://docs.ipfs.io/guides/guides/install/

4. Run Ganance on port `8545`

5. Move into `client` directory

      `cd PrimisFinalProject`
      
      `cd client`

5. Install dependencies

      `npm install`
      

6. Migrate contracts

      `truffle migrate`
      
7. In a seperate terminal window cd into /PrimisFinalProject and run IPFS
       
       `ipfs init`
       
       `ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001`
       
       `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' `
            
       `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]' `

       `ipfs daemon `

8. Return to orginal window

7. Run application

      `npm run start`


