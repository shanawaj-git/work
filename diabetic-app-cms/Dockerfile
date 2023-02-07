FROM node:14.20-alpine
ARG GIT_TOKEN

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/34301986/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc

RUN yarn install --production
RUN rm -f .npmrc
COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
