FROM node:12-alpine AS base

WORKDIR /usr

COPY package* ./
RUN npm i
COPY src ./src
COPY nest-cli.json ./
COPY tsconfig.* ./
RUN npm run build 

FROM node:12-alpine AS prod
COPY --from=base /usr/package* ./
COPY --from=base /usr/dist ./dist
RUN npm i --only=prod
CMD ["npm","run","start:prod"]
