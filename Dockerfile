FROM node:16.17 as builder

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

# Change working directory
WORKDIR /home/node/api
# Copy package.json and package-lock.json
COPY package*.json ./
COPY credentials.json ./
COPY token.json ./

USER node
# Install npm production packages
ENV NODE_ENV production
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm install
COPY --chown=node:node . .
ENV PORT 9000
RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
