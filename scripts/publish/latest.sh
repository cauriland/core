#!/usr/bin/env bash

for dir in `find packages -mindepth 1 -maxdepth 1 -type d | sort -nr`; do
    git checkout main
    cd $dir
    echo $PWD
    npm publish --tag latest
    cd ../..
done
