FROM mhart/alpine-node:8

# Update apk repo
RUN apk update

# Install bash
RUN apk add --update bash

# Install yarn
RUN npm install -g yarn --prefix=/usr/local
RUN ln -s -f /usr/local/bin/yarn /usr/bin/yarn

# Where the project's code should go
RUN mkdir /app
WORKDIR /app
COPY . /app

RUN sh -c "cd /app && yarn && yarn cache clean && ./configure"
