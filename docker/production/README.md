# Cauri Core Docker

<p align="center">
    <img src="./cauri-core-docker.png" width="100%" height="100%" />
</p>

## Introduction

Official Production ready Cauri Core images available now at [Docker Hub](https://hub.docker.com/r/cauriland/core).

## Documentation

-   Development : https://learn.cauri.dev/
-   Docker : https://guides.cauri.dev/devops-guides/how-to-setup-a-node-with-docker

## API Documentation

-   API : https://api.cauri.dev/

## Cauri Core Relay

Run Relay only node using [Docker Compose](https://docs.docker.com/compose/)

**_DevNet_**

> Create file `docker-compose.yml` with the following content:

```bash
version: '2'
services:
  postgres:
    image: "postgres:alpine"
    container_name: postgres-devnet
    restart: always
    volumes:
      - 'postgres:/var/lib/postgresql/data'
    networks:
      - core
    environment:
     POSTGRES_PASSWORD: password
     POSTGRES_DB: core_devnet
     POSTGRES_USER: node
  core:
    image: cauriland/core:devnet
    container_name: core-devnet
    restart: always
    ports:
     - "4302:4302"
     - "4303:4303"
     - "4343:4343"
     - "127.0.0.1:4304:4304"
     - "127.0.0.1:8010:8010"
    cap_add:
      - SYS_NICE
      - SYS_RESOURCE
      - SYS_TIME
    volumes:
     - ~/.config/cauri-core:/home/node/.config/cauri-core
     - ~/.local/share/cauri-core:/home/node/.local/share/cauri-core
     - ~/.local/state/cauri-core:/home/node/.local/state/cauri-core
     - /etc/timezone:/etc/timezone:ro
     - /etc/localtime:/etc/localtime:ro
     - ./enc:/run/secrets
    networks:
      - core
    env_file: ./devnet.env
    tty: true
    links:
     - postgres
    depends_on:
      - postgres
volumes:
  postgres:
  core:
networks:
  core:
```

> Create file `devnet.env` with the following content:

```bash
MODE=relay
NETWORK=devnet
CORE_LOG_LEVEL=debug
CORE_LOG_LEVEL_FILE=info
CORE_DB_HOST=postgres-devnet
CORE_DB_USERNAME=node
CORE_DB_PASSWORD=password
CORE_DB_DATABASE=core_devnet
CORE_P2P_HOST=0.0.0.0
CORE_P2P_PORT=4302
CORE_API_HOST=0.0.0.0
CORE_API_PORT=4303
CORE_WEBHOOKS_HOST=0.0.0.0
CORE_WEBHOOKS_PORT=4304
```

**_MainNet_**

> Create file `docker-compose.yml` with the following content:

```bash
version: '2'
services:
  postgres:
    image: "postgres:alpine"
    container_name: postgres-mainnet
    restart: always
    volumes:
      - 'postgres:/var/lib/postgresql/data'
    networks:
      - core
    environment:
     POSTGRES_PASSWORD: password
     POSTGRES_DB: core_mainnet
     POSTGRES_USER: node
  core:
    image: cauriland/core
    container_name: core-mainnet
    restart: always
    ports:
     - "4301:4301"
     - "4303:4303"
     - "4343:4343"
     - "127.0.0.1:4304:4304"
     - "127.0.0.1:8010:8010"
    cap_add:
      - SYS_NICE
      - SYS_RESOURCE
      - SYS_TIME
    volumes:
     - ~/.config/cauri-core:/home/node/.config/cauri-core
     - ~/.local/share/cauri-core:/home/node/.local/share/cauri-core
     - ~/.local/state/cauri-core:/home/node/.local/state/cauri-core
     - /etc/timezone:/etc/timezone:ro
     - /etc/localtime:/etc/localtime:ro
     - ./enc:/run/secrets
    networks:
      - core
    env_file: ./mainnet.env
    tty: true
    links:
     - postgres
    depends_on:
      - postgres
volumes:
  postgres:
  core:
networks:
  core:
```

> Create file `mainnet.env` with the following content:

```bash
MODE=relay
NETWORK=mainnet
CORE_LOG_LEVEL=info
CORE_LOG_LEVEL_FILE=info
CORE_DB_HOST=postgres-mainnet
CORE_DB_USERNAME=node
CORE_DB_PASSWORD=password
CORE_DB_DATABASE=core_mainnet
CORE_P2P_HOST=0.0.0.0
CORE_P2P_PORT=4301
CORE_API_HOST=0.0.0.0
CORE_API_PORT=4303
CORE_WEBHOOKS_HOST=0.0.0.0
CORE_WEBHOOKS_PORT=4304
```

_If you prefer to use custom DB Name, DB User and DB Password simply adjust variables `POSTGRES_PASSWORD`, `POSTGRES_USER`, `POSTGRES_DB`, `CORE_DB_PASSWORD`, `CORE_DB_USERNAME` and `CORE_DB_DATABASE` correspondingly._

> _Time to start the relay node_:

```bash
docker-compose up -d
```

### _Cauri Core docker image allows you to run a `forger`. However it requires some additional steps that can be found by visiting our [Documentation page](https://guides.cauri.dev/devops-guides/how-to-setup-a-node-with-docker#production-setup)._
