#!/usr/bin/env bash

rm -rf /home/cauri/cauri-core
git clone https://github.com/cauriland/core -b upgrade /home/cauri/cauri-core

mkdir /home/cauri/.cauri
touch /home/cauri/.cauri/.env

mkdir /home/cauri/.cauri/config

mkdir /home/cauri/.cauri/database
touch /home/cauri/.cauri/database/json-rpc.sqlite
touch /home/cauri/.cauri/database/transaction-pool.sqlite
touch /home/cauri/.cauri/database/webhooks.sqlite

mkdir /home/cauri/.cauri/logs
mkdir /home/cauri/.cauri/logs/mainnet
touch /home/cauri/.cauri/logs/mainnet/test.log
