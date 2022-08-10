FROM node:16 as builder

# Change working directory
WORKDIR /tmp
# Copy package.json and package-lock.json
COPY package*.json /tmp/

# Install npm production packages 
RUN npm install yarn --location=global --force
RUN yarn install
WORKDIR /api
COPY . .
ENV NODE_ENV=production
ENV PORT=9000
RUN yarn build


CMD ["yarn", "start"]
