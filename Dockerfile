FROM node:16 as builder

# Change working directory
WORKDIR /api
# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm production packages 
RUN npm install yarn --location=global --force
RUN yarn install
ENV NODE_ENV=production
ENV PORT=9000
COPY . .
RUN yarn build


CMD ["yarn", "start"]
