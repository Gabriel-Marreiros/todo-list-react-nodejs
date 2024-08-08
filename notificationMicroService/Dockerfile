FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["pm2-runtime", "dist/server.js", "--name", "todo-list-react-nodejs-notification-microservice", "--watch", "--no-daemon"]