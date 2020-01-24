import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import ipfs from "./ipfs.js";
import { Card, Heading, Text, Button, Box, Flex, TransferWithinAStation } from 'rimble-ui';
import { Input, Table } from 'rimble-ui';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { runExample } from './utils/utils.js';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
//import logo from "./img/logo.jpg"

class App extends Component {
  state = { storageValue: null, web3: null, accounts: null, contract: null, ipfsHash : null, buffer: null, proofs: [], proofcount: null, 
    cardUpload: (<Text.p ml={0} lineHeight={1.3} textAlign={'left'}>
      "Upload your file here. Primis will securley store your file and allow you to prove ownership over the file using blockchain. 
        Files will never be uploaded to the blockchain. Only a cryptographically  secure hash of the file."</Text.p>)};

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

    
        let result = []
      instance.events.LogProofs({
        filter: {address: [this.state.accounts]}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
    }, (error, event)=>{
      if(event.returnValues[0] == this.state.accounts){
        const entries = Object.entries(event.returnValues)
        console.log(event.returnValues.proof)
       
      result.push(event.returnValues.proof)
        let resultItems = []
        for(let i= 1; i <= entries.length; i++){
        //console.log(event.returnValues[i])
        resultItems.push(event.returnValues[i])
        }
        console.log(result)
        this.setState({ resultItems: resultItems})
      }else
        console.log("wrong account buddy!")

      })
    this.setState({ result: result })
    

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }) //runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
//converts file submitted to a buffer
  convertToBuffer = async(reader) => {
    const buffer = await ipfs.Buffer.from(reader.result);
    this.setState({buffer});
    console.log(buffer)
  };
  
 //notarizes the ipfs hash of the file and on receipt runs updateState function
 notarize(content){
 this.state.contract.methods.notarize(content).send({ from: this.state.accounts[0] }).once('receipt', (receipt) => {
       this.updateState()
});

 };

updateState() {
      //renders JSX table displaying users proofs once button is clicked
      this.setState({
       cardUpload: 

         (
        <Container>
            <Card  md={7} width={'73%'} >
              <div className="table">
                <Table width={'100%'}>
                    <thead>
                      <tr>
                        <th>Transaction hash</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.result[0].slice(0,10) + "..." + this.state.result[0].slice(22,32)}</td>
                        <td>March 28 2019 08:47:17 AM +UTC</td>
                      </tr>
                      <tr>
                        <td>{this.state.result[1].slice(0,10) + "..." + this.state.result[0].slice(22,32)}</td>
                        <td>March 28 2019 08:52:17 AM +UTC</td>
                      </tr>
                      <tr>
                        <td>{this.state.result[2].slice(0,10) + "..." + this.state.result[2].slice(22,32)}</td>
                        <td>March 28 2019 08:55:17 AM +UTC</td>
                      </tr>
                    </tbody>
                </Table>
              </div>
            </Card>
        </Container>
                        )
                        
                      });
   }

 //helper function
 captureFile = (event) =>{
  event.stopPropagation()
  event.preventDefault()
  const file = event.target.files[0]
  let reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => this.convertToBuffer(reader)
};
 //awaits and logs proof on click
async getProof() {
  const proofCount = await this.state.contract.methods.proofCount().call()
  this.setState({ proofcount: proofCount }, function (){
    console.log("ProofCount:",proofCount);
 
  })
  let result = []
  for(var i = 1; i <= proofCount;i++){
    const proof =  await this.state.contract.methods.getProof(i).call()
    result.push(proof)
    this.setState({ proofs: [...this.state.proofs, result ]})
  }
  console.log(result)
}
 //adds buffer of file to ipfs network
  ipfsSubmit = async (event) => {
    event.preventDefault();

    const accounts = this.state.accounts;
    const buffer = this.state.buffer;
    console.log('Sending from Metamask account: ' + accounts[0]);
    console.log(buffer)

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash })
      this.notarize(ipfsHash[0].hash)
      console.log("IPFS Hash:", this.state.ipfsHash)

    })
    
  };

  
  
  render() {
    if (!this.state.web3) {
      //console.log(this.state.buffer)
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    //console.log(this.state.buffer)
    return (
      
      <div className="App">
        <div className="boxheading">
        <Box>
          <Text fontSize={48} fontFamily='sansSerif' fontWeight={400} 
         color={"#F4F4F4"}><div className="title">Primis
         <Image fluid />
         </div>
         </Text>
        </Box>
        </div>
        <Box p={6.5}  bg={'#4E3FCE'} height={0} >
        </Box>
           <Container>
                <Row>
                    <Col sm={7}>
                     <Heading  mt={"10%"} pb={"5%"} as={"h2"} fontSize={32} textAlign={'left'} fontFamily="sansSerif" fontStyle={'normal'} fontWeight={400} alignItems={'center'} 
                            >Upload a file </Heading>
                      {this.state.cardUpload}
                     </Col>
                      <Col sm={5}> 
                         <Card  mt={'25%'}>
                            <Container>               
                              <Row>
                                <Col>
                                     <Heading pb={30} as={"h4"} width={'100%'} textAlign={'center'}> Upload your Document here</Heading>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Container>
                                    <Box width={'100%'} border='1px dashed #CCCCCC' boxSizing={'border-box'} borderWidth={1} p={3}  bg={'#ECEAEA'} >
                                     <Input className="mb-3"  type="file" onChange = {this.captureFile} />
                                     </Box>
                                   </Container>
                                </Col>
                              </Row>
                              <Row>
                                 <Col> <Box pb={20}></Box> </Col>
                              </Row>
                              <Row>
                                  <Col>   
                                    <Button onClick={this.ipfsSubmit}> Submit</Button>
                                   <Button onClick={this.getProof}> Get Proof</Button></Col>
                                </Row>
                               <Row>
                                   <Col> 
                                   <Box pb={20}></Box> 
                                   </Col>
                                </Row>
                              </Container>
                           </Card>   
                      </Col> 
                  </Row>          
              </Container>
 

      
        
      </div>
    );
  }
}

export default App;
