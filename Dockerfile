# Dockerfile

FROM node:10.16.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY ./breads/ .
RUN chown -R app:app /opt/app
USER app
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "run", "pm2" ]