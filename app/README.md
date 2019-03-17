# Smart-asso
A web application helping an association to function in a decentralized way. Backend on [Ethereum](https://ethereum.org/), frontend on [IPFS](https://ipfs.io/).  
  
## Functionnalities
- Request membership
- Vote from the members to accept the membership request (majority)
- Request for exclusion of a member
- Vote from the members to accept the exclusion request (majority)
- Submit a proposal
- Vote from the members to accept the proposal (majority)
  
__Not finished yet.__  
 
## IPFS Installation
```shell
wget https://dist.ipfs.io/go-ipfs/v0.4.19/go-ipfs_v0.4.19_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.4.19_linux-amd64.tar.gz && cd go-ipfs
./install.sh # As root !
```
  
## Run the application
```shell
git clone https://github.com/Crypto-lyon/smart-asso-frontend && cd smart-asso-frontend/app
ipfs init # Only the first time
ipfs daemon &> ipfs.log & # Use this or run it in screen
npm run build
npm run ipfs-deploy
```
You can now access the web application from `https://localhost:8080/ipfs/<hash>` with `<hash>` being the hash of the build directory output by the last command.  
