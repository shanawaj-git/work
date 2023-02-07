FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 5001

CMD ["node", "dist/main"]
