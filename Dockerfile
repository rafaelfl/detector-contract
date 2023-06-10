# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM ubuntu:22.04

WORKDIR /app
COPY . .

RUN apt-get update

# Install curl
RUN apt-get -y install curl build-essential libc6-dev libffi-dev libleveldb-dev libssl-dev

# Install Node.js
ENV NODE_VERSION=16.15.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Install Yarn
RUN npm install --global yarn

# Install Rust/cargo
ENV PATH="/root/.cargo/bin:$PATH"
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable
RUN rustup default nightly

# Install solidity
RUN npm install -g solc

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apt-get -y install python3 && ln -sf python3 /usr/bin/python
RUN apt-get -y install python3-dev python3-pip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install qemu and libs necessary to run the tools
ENV QEMU_LD_PREFIX=/usr/x86_64-linux-gnu
RUN if [ ! "$(uname -m)" = "x86_64" ]; then \
    export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -y --no-install-recommends libc6-amd64-cross \
    && rm -rf /var/lib/apt/lists/*; fi

# Install Solidity compiler for version >= 0.8.18
RUN pip3 install solc-select
RUN solc-select install 0.8.18 && solc-select use 0.8.18

# Install slither and mythril
RUN pip3 install mythril slither-analyzer

RUN yarn install --production
CMD ["yarn", "start"]
EXPOSE 3000

