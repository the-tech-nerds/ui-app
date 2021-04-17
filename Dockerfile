FROM node:14-alpine
RUN mkdir /app
WORKDIR /app

EXPOSE 3000

COPY package*.json /app/
COPY .npmrc /app/

RUN npm install --production
RUN rm -f .npmrc

COPY .next /app/.next
COPY assets /app/assets

CMD [ "npm start" ]
ENTRYPOINT [ "sh", "-c" ]