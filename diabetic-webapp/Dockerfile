FROM node:16.12-alpine as builder

ARG GIT_TOKEN
ARG API_BASE_URL
ARG WOOS_MAP_KEY
ARG GOOGLE_PLACES_KEY
ARG GOOGLE_MAP_KEY

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY internals ./internals

RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/32140238/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc

RUN echo API_BASE_URL=${API_BASE_URL}>>.env

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

ENV WOOS_MAP_KEY=$WOOS_MAP_KEY
ENV GOOGLE_PLACES_KEY=$GOOGLE_PLACES_KEY
ENV GOOGLE_MAP_KEY=$GOOGLE_MAP_KEY

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
