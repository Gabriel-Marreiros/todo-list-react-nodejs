FROM node:18 as build

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

EXPOSE 8080

WORKDIR /app

COPY --from=build /build/package*.json .
COPY --from=build /build/dist ./dist

RUN npm install --only=production

RUN npm install -g pm2

CMD ["pm2-runtime", "start", "dist/server.js", "--name", "todo-list-react-nodejs", "--watch"]