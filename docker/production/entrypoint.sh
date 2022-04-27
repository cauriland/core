#!/usr/bin/env bash
sudo /usr/sbin/ntpd -s

sudo rm -rf /home/node/.config/cauri-core/*
sudo rm -rf /home/node/.local/state/cauri-core/*
sudo chown node:node -R /home/node
sudo ln -s /home/node/.yarn/bin/cauri /usr/bin/cauri
cauri config:publish --network=$NETWORK
echo > /home/node/.config/cauri-core/$NETWORK/.env

if [ "$MODE" = "forger" ]; then
  SECRET=`openssl rsautl -decrypt -inkey /run/secrets/secret.key -in /run/secrets/secret.dat`
  CORE_FORGER_PASSWORD=`openssl rsautl -decrypt -inkey /run/secrets/bip.key -in /run/secrets/bip.dat`

  # configure
  if [ -n "$SECRET" ] && [ -n "$CORE_FORGER_PASSWORD" ]; then
    cauri config:forger:bip38 --bip39 "$SECRET" --password "$CORE_FORGER_PASSWORD"
  elif [ "$MODE" = "forger" ] && [ -z "$SECRET" ] && [ -z "$CORE_FORGER_PASSWORD" ]; then
    echo "set SECRET and/or CORE_FORGER_PASWORD if you want to run a forger"
    exit
  elif [ -n "$SECRET" ] && [ -z "$CORE_FORGER_PASSWORD" ]; then
    cauri config:forger:bip39 --bip39 "$SECRET"
  fi
fi

# relay
if [[ "$MODE" = "relay" ]]; then
    cauri relay:run
fi

# forging
if [ "$MODE" = "forger" ] && [ -n "$SECRET" ] && [ -n "$CORE_FORGER_PASSWORD" ]; then
    export CORE_FORGER_BIP38=$(grep bip38 /home/node/.config/cauri-core/$NETWORK/delegates.json | awk '{print $2}' | tr -d '"')
    export CORE_FORGER_PASSWORD
    sudo rm -rf /run/secrets/*
    cauri core:run
elif [ "$MODE" = "forger" ] && [ -z "$SECRET" ] && [ -z "$CORE_FORGER_PASSWORD" ]; then
    echo "set SECRET and/or CORE_FORGER_PASWORD if you want to run a forger"
    exit
elif [ "$MODE" = "forger" ] && [ -n "$SECRET" ] && [ -z "$CORE_FORGER_PASSWORD" ]; then
    cauri core:run
fi
