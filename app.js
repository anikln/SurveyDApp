// Import libraries we need.
import { default as Web3} from 'web3'
import { default as contract } from 'truffle-contract'

import survey_artifacts from './build/contracts/Survey.json'

var Survey = contract(survey_artifacts);
var total;
var percentage;

window.myfunction = function(myCheck,myCheck2) {
	var voteYes = document.getElementById("myCheck").checked;
	var voteNo = document.getElementById("myCheck2").checked;
	if(voteYes && voteNo){
		document.getElementById("demo").innerHTML = "You can not choose both.Please answer again";
	}
	else if((voteYes && !voteNo) || (voteNo && !voteYes) ){
		document.getElementById("myCheck").checked = false;
		document.getElementById("myCheck2").checked = false;
		
		Survey.deployed().then(function(contractInstance) {
					document.getElementById("demo").innerHTML = "Your vote is submitted.Wait until it is saved to blockchain";
					if(voteYes==1){
					    return contractInstance.answerfun(1, {gas: 140000, from: web3.eth.accounts[0]}).then(function(receipt) {
							console.log(receipt);
							$("#insTrans").html('Block hash: ' +receipt.receipt.blockHash);
							$("#buttonVote").hide();
                            document.getElementById("msg").innerHTML = "Your vote is submitted";
						}).catch(function(e) {
                            console.log(e);
                            console.log("ERROR");
                        });
					}
					else{
					    return contractInstance.answerfun(2, {gas: 140000, from: web3.eth.accounts[0]}).then(function(receipt) {
                            console.log(receipt);
							$("#insTrans").html('Block hash: ' +receipt.receipt.blockHash);
							$("#buttonVote").hide();
                            document.getElementById("msg").innerHTML = "Your vote is submitted";
						}).catch(function(e) {
                            console.log(e);
                            console.log("ERROR");
                        });						
					}					
		});	 
	}
	else{
		document.getElementById("demo").innerHTML = "Please check one box and vote again";
	}
}

window.Showresults = function() {
	$("#table").show();
	Survey.deployed().then(function(contractInstance) {
		return contractInstance.total.call().then(function(total){
			$("#total").html(total.toString());
			if(total == 0){
				percentage = 0;
				$("#pososto").html(percentage.toString());
			}
			else{
				return contractInstance.posostonai.call().then(function(yes){
					percentage = (yes/total)*100
					$("#pososto").html(percentage.toString());
				});
			}
		});
	});
}

$('document').ready(function(){
	
	//this if is used to define who will provide the web3 api
	if (typeof web3 !== 'undefined') {
		console.warn("Using web3 detected from external source like Metamask")
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} 
	else {
		console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}
  	$("#demo").html("");
	Survey.setProvider(web3.currentProvider);
    Survey.deployed().then(function(contractInstance) {	
        return contractInstance.admin.call().then(function(adminAddress) {
            console.log("tt"+adminAddress);        
            $("#admin").html(adminAddress);	
        });
	});
  //now we call contract function to ensure if user have answered again and inform him.
	Survey.deployed().then(function(contractInstance) {	
        let admin = contractInstance.admin.call();
        console.log("tt"+admin);        
        $("#admin").html(admin);	
        return contractInstance.hasVote.call(web3.eth.accounts[0]).then(function(b) {
			console.log(b);
			//inform the user if he had answered before
			if(b == true){
				document.getElementById("msg").innerHTML = "You can not answer because either you had answered one time or you are not a registered member";
				$("#buttonVote").hide();
			}
			else{
				document.getElementById("msg").innerHTML = "First time answering";
			}
		});
	});
    // show the results only when the survey is completed and everyone had voted
	Survey.deployed().then(function(contractInstance) {
		return contractInstance.completed.call().then(function(q) {
		    if(q){
		    	$("#results").show();	
		    	document.getElementById("msg").innerHTML = "The research is completed.Press show results to see the results";
		    }		
		    else{	
			    $("#results").hide();
		    }		
		});
	});
	$("#table").hide();   
}); 
