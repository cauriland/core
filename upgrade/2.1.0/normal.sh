#!/usr/bin/env bash

cd ~/cauri-core
pm2 delete all
git reset --hard
git pull
git checkout main
yarn run bootstrap
yarn run upgrade

# If you do not use Core Commander you can skip this step.
cd ~/core-commander
git reset --hard
git pull
git checkout main
bash commander.sh
