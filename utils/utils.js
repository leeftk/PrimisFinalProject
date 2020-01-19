
const runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.proof().call();
    //console.log(response)
    // Update state with the result.
    //this.setState({ storageValue: response });
    const proofCount = await contract.methods.proofCount().call()
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
   
   
    this.getProof = this.getProof.bind(this);

    
      
          
  };

  export default runExample;