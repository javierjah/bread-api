FROM node:lts

WORKDIR /app

COPY ./package*.json .
COPY ./yarn*.lock .

RUN yarn
RUN chown -R node:node /app
USER node

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js


COPY . .
EXPOSE 3000

CMD yarn start