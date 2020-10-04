FROM node:lts
LABEL version="1.0"

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

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