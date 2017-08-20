FROM mhart/alpine-node:8

# Update apk repo
RUN apk update

# Tiny init
RUN apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/ tini

# Install yarn
RUN npm install -g yarn --prefix=/usr/local
RUN ln -s -f /usr/local/bin/yarn /usr/bin/yarn

# Install Node.js dependencies
RUN yarn install --production --no-progress && yarn cache clean

# Where the project's code should go
RUN mkdir /app
WORKDIR /app
COPY . /app

CMD ["yarn", "db-migrate"]
