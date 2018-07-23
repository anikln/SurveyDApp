pragma solidity ^0.4.23;

contract Survey {
	mapping ( address => User ) members;
	
	struct User {
		bool registered;
		bool hasVoted;	
  	}

	uint private sunolo;
	uint private nai;
	uint private number;
	address public admin;
	
	constructor (address[] addresses_) public{
		for(uint i = 0; i < addresses_.length; i++){
			members[addresses_[i]].registered = true;
			members[addresses_[i]].hasVoted = false;
		}	
		admin = msg.sender;
		number = addresses_.length;			
		sunolo = 0;
		nai = 0;
	}

    /* checks if an address has voted */
	function hasVote(address x) view public returns (bool){
	    if(members[x].registered == true){
	    	return members[x].hasVoted;
		}
		else{
	    	return true;
		}
	}
    
    /* returns the number of the users participating */
	function num() view public returns (uint){
		return number;
	}

	/* stores the results of the vote */
	function answerfun(uint answer) public{
		require(members[msg.sender].registered == true);
		require(members[msg.sender].hasVoted == false);
		require(sunolo < number);
		require(answer == 1 || answer == 2);
		if(answer == 1){
			nai = nai + 1;		
		}
		members[msg.sender].hasVoted = true;
		sunolo = sunolo + 1;		
	}	
	
    /* returns the number of the users that voted yes */
	function posostonai() view public returns(uint){
		return nai;
	}
	
    /* returns the number of the users that voted so far */
	function total() view public returns (uint){
		return sunolo;
	}	

    /* checks if everyone has voted and so if the survey is over */
	function completed() view public returns(bool){
		if(sunolo == number){
			return true;
		}
		else{
			return false;
		}	
	}	

}

