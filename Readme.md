# A DApp used for Surveys

<p align="justify">This project presents a DApp that can be used for conducting a survey, ensuring the integrity of the results. The user visits the webpage that host the survey, he answers the question and the results are stored to the smart contract in the blockchain. There have been made some assumptions, that the service conducting the survey has predetermined the users that will answer the questionnaire and randomly has distributed Ethereum accounts to them. So the procedure followed is: the user receives an Ethereum account and its password, he signs in to the account with metamask extension, he goes to the webpage and then he votes paying with the ether provided with the given account. Only the registered accounts can take part in the survey. No user can retake the survey and the anonymity of the user's vote is ensured from the service by randomly distributing the accounts. The results of the survey are only visible when every user has vote and they are visible to everyone. Moreover the smart contract stores the address of the Ethereum account that was used to deploy it to the blockchain, so it can be verified which service deployed the smart contract and conducts the survey.</p>

## Getting Started

These instructions will walk you through how to get a copy of the survey DApp and use it as you wish.

### Prerequisites

This project is developed with Truffle framework and it uses Metamask extension. So after you clone or download the project you need to:
1.Install truffle globally with the command:

```
npm install truffle -g
```
2.Check the application in a local test blockchain created with ganache-cli. Install ganache-cli globally with the command:
```
npm install -g ganache-cli
```
3.Install metamask extension to your chrome browser

4.Insall develper-dependencies for the project. From a terminal enter the file and run the command
```
npm install --dev
```

**Note: you may need to step 1,2 with sudo
 
### Installation

This section provides the way to get the app up and running

1.Open a terminal and run ganache-cli to create a local private blockchain. Execute the command:

```
ganache-cli -b 15 -m "inform tiny poverty dutch pig valve displ law rigid anger gaze jealous" -i 5777
```

If you like you can change the flags but keep in mind that you should change migrations file, and redefine which accounts are allowed to vote. Now only the second and third account are allowed to vote.

2.Open another terminal, navigate to the project folder and compile the contracts with the command:

```
truffle compile
```

3.Then in the same terminal deploy the contract to the local blockchain with the command:

```
truffle migrate --network ganache
```

**Note: If you want terminate ganache-cli and you open it again later you have to redeploy the contracts to the local blockchain so you need to execute the command:

```
truffle migrate --reset --network ganache
```

4.Open the website with the command

```
npm start
```
Now the DApp should be running at localhost:8080

5.Go to the webpage at localhost:8080 and sign in to metamask. In order to sign in with metamask you need to choose "localhost:8545", then restore from seed phrase. Then for seed phrase provide the "inform tiny poverty dutch pig valve displ law rigid anger gaze jealous" and whatever password you want. Then you can change to another account from the upper right button. It should be noticed that only account 2 and 3 are allowed to vote, but someone can change the appropriate field in the migrations file in order to configure another set of accounts that will be able to participate.

## Deployment

If someone wants to deploy the contract to the Ethereum mainnet or in an Ethereum testnet, he has to modify the truffle.js accordingly to the network he wish

## Authors

* **Klinaki Athina Styliani** -  [AniKln](https://github.com/anikln)

