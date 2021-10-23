FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "run", "dev"]