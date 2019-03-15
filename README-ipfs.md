# What is Ethereum


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
ipfs daemon &> ipfs.log & # Does not run in background by default use it or screen
# Check peers with
ipfs swarm peers
```
You can also have a nice web interface at [http://localhost:5001/ipfs/QmXc9raDM1M5G5fpBnVyQ71vR4gbnskwnB9iMEzBuLgvoZ](http://localhost:5001/ipfs/QmXc9raDM1M5G5fpBnVyQ71vR4gbnskwnB9iMEzBuLgvoZ)
