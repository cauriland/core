#!/usr/bin/env bash

cd ~/cauri-core
pm2 delete cauri-core
pm2 delete cauri-core-relay
git reset --hard
git pull
git checkout main
yarn run bootstrap
yarn run upgrade

pm2 --name 'cauri-core-relay' start ~/cauri-core/packages/core/dist/index.js -- relay --network mainnet
