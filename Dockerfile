FROM node:16

WORKDIR /app/server

RUN npm config set registry https://registry.npm.taobao.org && \
    npm install yarn -g --force && \
    npm install pm2 -g --force

COPY ./server/package*.json ./

RUN yarn install

COPY ./server .

RUN npx tsc

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN yarn install

COPY ./frontend .

EXPOSE 5173

CMD cd /app/server && pm2 start ./index.js && cd /app/frontend && yarn start