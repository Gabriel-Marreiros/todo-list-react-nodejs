FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g pm2

EXPOSE 5173

CMD ["pm2", "serve", "dist", "5173", "--no-daemon", "--spa"]

MAINTAINER gabrielmarreiros.com.br