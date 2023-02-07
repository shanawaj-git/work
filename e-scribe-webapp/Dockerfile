FROM node:16.12-alpine as builder

ARG GIT_TOKEN

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY internals ./internals

RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/32140238/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc

# The following packages are required by some dependencies to be installed
RUN apk --update --no-cache \
		add  \
		automake \
		git \
		alpine-sdk  \
		nasm  \
		autoconf  \
		build-base \
		zlib \
		zlib-dev \
		libpng \
		libpng-dev\
		libwebp \
		libwebp-dev \
		libjpeg-turbo \
		libjpeg-turbo-dev

RUN yarn install --legacy-peer-deps --ignore-platform
RUN rm -f .npmrc

COPY app ./app
COPY tsconfig.json ./
COPY babel.config.js ./
RUN yarn build


FROM node:16.12-alpine 

COPY --from=builder /app/package.json ./
# TODO: this node_modules dir is large as it has UI + Server dependencies
# TODO: to reduce the size of the image, separate the packages for server and install them just before starting it
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/build ./build
COPY server ./server

CMD ["yarn","start:prod"]
