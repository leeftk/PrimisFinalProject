import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
//import IPFS from './ipfs.js'
import "./App.css";
import ipfs from "./ipfs.js";
import { Card, Heading, Text, Button, Box, Flex } from 'rimble-ui';
import { Input } from 'rimble-ui';


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, ipfsHash : null , buffer:null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  convertToBuffer = async(reader) => {
    const buffer = await ipfs.Buffer.from(reader.result);
    this.setState({buffer});
    console.log(buffer)
  };
  
 //converts file submitted to a buffer
 captureFile = (event) =>{
   event.stopPropagation()
   event.preventDefault()
   const file = event.target.files[0]
   let reader = new window.FileReader()
   reader.readAsArrayBuffer(file)
   reader.onloadend = () => this.convertToBuffer(reader)
   //this.setState({buffer:reader})
 };

 //helper function

  

  ipfsSubmit = async (event) => {
    event.preventDefault();

    const accounts = this.state.accounts;
    const buffer = this.state.buffer;
    console.log('Sending from Metamask account: ' + accounts[0]);
    console.log(buffer)

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log(this.state.ipfsHash)
    })
  };

  
  
  render() {
    if (!this.state.web3) {
      //console.log(this.state.buffer)
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state.buffer)
    return (
      <div className="App">
        <Box borderWidth={1} p={3} width={[2, 2, 1]} bg={'#555555'} height={200} >
          <Text fontSize={48} fontFamily='sansSerif' fontWeight={400} 
          alignItems={'center'} mr={1100}  mt={50} color={"#F4F4F4"}>Primis</Text>
          <Text.p lineHeight={1.3} ml={210} width={1 / 2}  color={"white"} textAlign={'left'} color={'#F4F4F4'} fontWeight={'normal'} alignItems={'center'}>Proving firstness.
          secure hash of the file.</Text.p>
        </Box>
        <Box p={6.5}  bg={'#4E3FCE'} height={0} >
        </Box>

        <Flex>
        <Box p={3} width={1 / 2} >
        <Heading  ml={200} mt={50} pb={10} as={"h2"} fontSize={32} textAlign={'left'} fontFamily="sansSerif" fontStyle={'normal'} fontWeight={400} alignItems={'center'} 
         >Upload a file </Heading>
        <Text.p ml={200} lineHeight={1.3} textAlign={'left'}>Upload your file here. Primis will securley store your file and allow you to prove ownership 
          over the file using blockchain. Files will never be uploaded to the blockchain. Only a cryptographically 
          secure hash of the file.</Text.p>
        </Box>
        <Box p={3} width={1 / 2} >
        <Card ml={200} mt={20} width={'420px'}  px={4}>
          <Heading pb={30} as={"h3"} pr={100}>Upload your Document here</Heading>
        <Box border='1px dashed #CCCCCC' boxSizing={'border-box'} borderWidth={1} p={3} width={[2, 2, 1]} bg={'#ECEAEA'}  >
        <Input type="file" />
        </Box>
        <Box pb={20}></Box>
        <Button>Submit</Button>
        </Card>
        </Box>
      </Flex>
       
   
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <form onSubmit={this.ipfsSubmit}>
        <input type="file" onChange = {this.captureFile}/>
        <Button size={'medium'}>Submit</Button>;
        </form>
        <p>
          run ipfs daemon in a seperate terminal window/*
          Try uploading a file to IPFS while you have an IPFS daemon running!!
          If you see the IPFS hash in the console then the file was upload successfully!
        </p>
        <div>The stored value is: {this.state.storageValue} the ipfs version is {this.state.ipfshash}</div>
       <a href={"https://gateway.ipfs.io/ipfs/" + this.state.ipfsHash}>Click to see on IPFS. </a> 
         */}

      
        
      </div>
    );
  }
}

export default App;
