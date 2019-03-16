# What is IPFS
IPFS (*I*nter*P*lanetary *F*ile *S*ystem) is a distributed versioned filesystem. Using this peer-to-peer network, you are able to store your file/website (in theory) on a world-wide shared database, thus making it unstoppable.  

# Install
```shell
wget https://dist.ipfs.io/go-ipfs/v0.4.19/go-ipfs_v0.4.19_linux-amd64.tar.gz
tar -xvzf go-ipfs.tar.gz && cd go-ipfs
./install.sh # As root !
```

For windows : https://docs.ipfs.io/introduction/install/  

# Initialisation
```shell
ipfs init
ipfs daemon &> ipfs.log & # Does not run in background by default use this or screen
# Check peers with
ipfs swarm peers
```
You can also have a nice web interface at [http://localhost:5001/ipfs/QmXc9raDM1M5G5fpBnVyQ71vR4gbnskwnB9iMEzBuLgvoZ](http://localhost:5001/ipfs/QmXc9raDM1M5G5fpBnVyQ71vR4gbnskwnB9iMEzBuLgvoZ)  

# Launch
![A fucking rocket launch](https://spacenews.com/wp-content/uploads/2018/12/rocketlab-pickering2.jpg)
```shell
cd app && ipfs add -r build/
```
