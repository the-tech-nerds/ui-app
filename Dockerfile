FROM node:14-alpine
RUN mkdir /app
WORKDIR /app

EXPOSE 3000

COPY package*.json /app/
COPY .npmrc /app/
COPY next.config.js /app/

RUN npm install --production
RUN rm -f .npmrc

COPY .next /app/.next
COPY public /app/public

CMD [ "cp /data/env /app/.env && npm start" ]
ENTRYPOINT [ "sh", "-c" ]
