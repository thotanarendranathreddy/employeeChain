var accounts;
var account;
var foodSafeContract;
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
        foodSafeContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"GetCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Phone","type":"uint256"},{"name":"Name","type":"string"},{"name":"Password","type":"string"}],"name":"addNewAccount","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"CountNo","type":"uint8"}],"name":"getAccount","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function"}]);
        foodSafeCode = ("60606040526000600160006101000a81548160ff021916908360ff160217905550341561002b57600080fd5b5b6106278061003b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ab9397114610054578063315417e9146100835780636c3aa54d1461012c575b600080fd5b341561005f57600080fd5b610067610247565b604051808260ff1660ff16815260200191505060405180910390f35b341561008e57600080fd5b61012a600480803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061025f565b005b341561013757600080fd5b610150600480803560ff1690602001909190505061033c565b604051808060200185815260200184815260200180602001838103835287818151815260200191508051906020019080838360005b838110156101a15780820151818401525b602081019050610185565b50505050905090810190601f1680156101ce5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156102085780820151818401525b6020810190506101ec565b50505050905090810190601f1680156102355780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b6000600160009054906101000a900460ff1690505b90565b6102676104f9565b828160000181905250838160200181815250508181606001819052504281604001818152505080600080600160009054906101000a900460ff1660ff16815260200190815260200160002060008201518160000190805190602001906102ce92919061052e565b50602082015181600101556040820151816002015560608201518160030190805190602001906102ff92919061052e565b509050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550505b50505050565b6103446105ae565b60008061034f6105ae565b6000808660ff1681526020019081526020016000206000016000808760ff168152602001908152602001600020600101546000808860ff168152602001908152602001600020600201546000808960ff168152602001908152602001600020600301838054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104465780601f1061041b57610100808354040283529160200191610446565b820191906000526020600020905b81548152906001019060200180831161042957829003601f168201915b50505050509350808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104e25780601f106104b7576101008083540402835291602001916104e2565b820191906000526020600020905b8154815290600101906020018083116104c557829003601f168201915b5050505050905093509350935093505b9193509193565b60806040519081016040528061050d6105c2565b815260200160008152602001600081526020016105286105c2565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061056f57805160ff191683800117855561059d565b8280016001018555821561059d579182015b8281111561059c578251825591602001919060010190610581565b5b5090506105aa91906105d6565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b6105f891905b808211156105f45760008160009055506001016105dc565b5090565b905600a165627a7a72305820358a53ccc8a91250f0c48d9321c227178ffb6ca9f7d27773bf1bd77e3b1a4b610029");    
    });
  },
    createContract: function()
  {
	  console.log('fffff');
    foodSafeContract.new("", {from:account, data: foodSafeCode, gas: 3000000}, function (error, deployedContract){
      if(deployedContract.address)
      {
        document.getElementById("contractAddress").value=deployedContract.address;
      }
    })
  },
  addNewAccount: function()
  {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;   
    deployedFoodSafe.AddNewLocation(username, phone, pass, function(error){
      console.log(error);
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