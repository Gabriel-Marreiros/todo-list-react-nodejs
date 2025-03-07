FROM node:18 as build

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc && npx vite build --base=/todo-list/

FROM node:18-alpine

EXPOSE 5173

WORKDIR /app

COPY --from=build /build/package*.json ./
COPY --from=build /build/dist ./dist

RUN npm install --only=production

# Install a lightweight web server
RUN npm install -g serve

# Set the command to run the web server
CMD ["serve", "-p", "5173", "-s", "dist"]

# CMD ["pm2", "serve", "dist", "5173", "--no-daemon", "--spa"]