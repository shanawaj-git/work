FROM node:16-alpine AS deps

ARG GIT_TOKEN
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN echo '@albathanext:registry=https://gitlab.com/api/v4/packages/npm/'>>.npmrc && \
	echo '//gitlab.com/api/v4/packages/npm/:_authToken=glpat-QLLRXAyyAAy_HTt3WUVu'>>.npmrc && \
	echo '//gitlab.com/api/v4/projects/32140238/packages/npm/:_authToken=glpat-QLLRXAyyAAy_HTt3WUVu'>>.npmrc

RUN cat .npmrc

RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder

ENV NODE_ENV=production
ENV STRAPI_GRAPHQL_URL=https://autofix-apim.azure-api.net/cms/graphql
ENV STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms/
ENV NEXT_PUBLIC_STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms
ENV NEXT_PUBLIC_STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms
ENV NEXT_PUBLIC_WOOSMAP_KEY=woos-48c80350-88aa-333e-835a-07f4b658a9a4
ENV NEXT_PUBLIC_GOOGLE_PLACES_KEY=AIzaSyAgaUwsVVXJ6KMxlxILqyHi_-udaQke7M4
ENV NEXT_PUBLIC_GOOGLE_KEY=AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14
ENV NEXT_PUBLIC_INITIAL_COORDINATES='{"lat": 25.19741055892981, "lng": 55.27478409367688}'

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ENV STRAPI_GRAPHQL_URL=https://autofix-apim.azure-api.net/cms/graphql
ENV STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms/
ENV NEXT_PUBLIC_STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms
ENV NEXT_PUBLIC_STRAPI_SERVICE=https://autofix-apim.azure-api.net/cms
ENV NEXT_PUBLIC_WOOSMAP_KEY=woos-48c80350-88aa-333e-835a-07f4b658a9a4
ENV NEXT_PUBLIC_GOOGLE_PLACES_KEY=AIzaSyAgaUwsVVXJ6KMxlxILqyHi_-udaQke7M4
ENV NEXT_PUBLIC_GOOGLE_KEY=AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14
ENV NEXT_PUBLIC_INITIAL_COORDINATES='{"lat": 25.19741055892981, "lng": 55.27478409367688}'

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]