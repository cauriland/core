#!/usr/bin/env bash

pm2 delete cauri-core > /dev/null 2>&1
pm2 delete cauri-core-relay > /dev/null 2>&1
pm2 delete cauri-core-forger > /dev/null 2>&1

pm2 delete core > /dev/null 2>&1
pm2 delete core-relay > /dev/null 2>&1
pm2 delete core-forger > /dev/null 2>&1

node ./scripts/upgrade/upgrade.js

# Sometimes the upgrade script doesn't properly replace CAURI_ with CORE_
# https://github.com/cauriland/core/blob/develop/scripts/upgrade/upgrade.js#L206
cd ~

if [ -f .config/cauri-core/devnet/.env ]; then
    sed -i 's/CAURI_/CORE_/g' .config/cauri-core/devnet/.env
fi

if [ -f .config/cauri-core/devnet/plugins.js ]; then
    sed -i 's/CAURI_/CORE_/g' .config/cauri-core/devnet/plugins.js
fi

if [ -f .config/cauri-core/mainnet/.env ]; then
    sed -i 's/CAURI_/CORE_/g' .config/cauri-core/mainnet/.env
fi

if [ -f .config/cauri-core/mainnet/plugins.js ]; then
    sed -i 's/CAURI_/CORE_/g' .config/cauri-core/mainnet/plugins.js
fi

cd ~/cauri-core
yarn setup
