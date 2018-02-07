import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS} from 'crypto-js';
var accounts;
var account;
var foodSafeABI;
var AccountContract;
var foodSafeCode;
window.App = {
  start: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount= account;
        AccountContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"GetCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"CountNo","type":"uint8"}],"name":"getAccount","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"companyName","type":"string"},{"name":"Name","type":"string"},{"name":"Password","type":"string"}],"name":"addNewAccount","outputs":[],"payable":false,"type":"function"}]);
        foodSafeCode = ("60606040526000600160006101000a81548160ff021916908360ff160217905550341561002b57600080fd5b5b6107818061003b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ab93971146100545780636c3aa54d14610083578063af4ea5b914610204575b600080fd5b341561005f57600080fd5b6100676102e7565b604051808260ff1660ff16815260200191505060405180910390f35b341561008e57600080fd5b6100a7600480803560ff169060200190919050506102ff565b60405180806020018060200185815260200180602001848103845288818151815260200191508051906020019080838360005b838110156100f65780820151818401525b6020810190506100da565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b8381101561015d5780820151818401525b602081019050610141565b50505050905090810190601f16801561018a5780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b838110156101c45780820151818401525b6020810190506101a8565b50505050905090810190601f1680156101f15780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b341561020f57600080fd5b6102e5600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061055e565b005b6000600160009054906101000a900460ff1690505b90565b61030761064d565b61030f61064d565b600061031961064d565b6000808660ff1681526020019081526020016000206000016000808760ff1681526020019081526020016000206001016000808860ff168152602001908152602001600020600201546000808960ff168152602001908152602001600020600301838054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561040f5780601f106103e45761010080835404028352916020019161040f565b820191906000526020600020905b8154815290600101906020018083116103f257829003601f168201915b50505050509350828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104ab5780601f10610480576101008083540402835291602001916104ab565b820191906000526020600020905b81548152906001019060200180831161048e57829003601f168201915b50505050509250808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105475780601f1061051c57610100808354040283529160200191610547565b820191906000526020600020905b81548152906001019060200180831161052a57829003601f168201915b5050505050905093509350935093505b9193509193565b610566610661565b8281600001819052508381602001819052508181606001819052504281604001818152505080600080600160009054906101000a900460ff1660ff16815260200190815260200160002060008201518160000190805190602001906105cc92919061069c565b5060208201518160010190805190602001906105e992919061069c565b5060408201518160020155606082015181600301908051906020019061061092919061069c565b509050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550505b50505050565b602060405190810160405280600081525090565b60806040519081016040528061067561071c565b815260200161068261071c565b81526020016000815260200161069661071c565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106dd57805160ff191683800117855561070b565b8280016001018555821561070b579182015b8281111561070a5782518255916020019190600101906106ef565b5b5090506107189190610730565b5090565b602060405190810160405280600081525090565b61075291905b8082111561074e576000816000905550600101610736565b5090565b905600a165627a7a72305820b6d0482c62bf694eb81da57a23b57933876afe02d9b7276b93f8a26eda862b910029");    
    });
  },
    createContract: function()
  {
    AccountContract.new("", {from:account, data: foodSafeCode, gas: 3000000}, function (error, deployedContract){
      if(deployedContract.address)
      {
        document.getElementById("contractAddress").value=deployedContract.address;
      }
    })
  },
  addNewAccount: function()
  {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedAccount = AccountContract.at(contractAddress);
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var companyName = document.getElementById("companyName").value;   
    deployedAccount.addNewAccount(companyName, username, pass, function(error){
      console.log(error);
	  if(error){
		  alert("Account has not been created");
	  }else {
		  alert("Account has been created successfully");
	  }
    })
  }
 
};

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
