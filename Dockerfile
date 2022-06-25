FROM node:14-alpine

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./

RUN npm install -g serve
RUN npm ci

COPY . .

CMD ["npm", "run", "production"]