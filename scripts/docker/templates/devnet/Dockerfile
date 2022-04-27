FROM node:12

WORKDIR /core

COPY  entrypoint.sh /

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    build-essential \
    jq \
    iptables \
    python \
    vim && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 4302 4303 4012 4022 4343
