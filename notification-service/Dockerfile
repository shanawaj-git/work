FROM node:16.13-alpine As development
ARG GIT_TOKEN

WORKDIR /usr/app

COPY package*.json ./

RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/34301986/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc

RUN npm install --only=development

RUN rm -f .npmrc

COPY . .

RUN yarn run build

FROM node:16.13-alpine as production

ARG GIT_TOKEN

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=3000

WORKDIR /usr/app

COPY package*.json ./

RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/34301986/packages/npm/:_authToken=${GIT_TOKEN}'>>.npmrc

RUN yarn install --only=production

RUN rm -f .npmrc

COPY . .

COPY --from=development /usr/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/src/main"]
