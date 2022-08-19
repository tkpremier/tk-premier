FROM node:16 as builder

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

# Change working directory
WORKDIR /home/node/api
# Copy package.json and package-lock.json
COPY package*.json ./
COPY credentials.json ./
COPY token.json ./

USER node
# Install npm production packages
RUN npm install --production
COPY --chown=node:node . .
ENV NODE_ENV production
ENV PORT 9000
ENV NODE_OPTIONS=--max_old_space_size=1184
RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
