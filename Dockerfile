FROM node:16

# Change working directory
WORKDIR /tmp
# Copy package.json and package-lock.json
COPY package*.json /tmp/

# Install npm production packages 
RUN npm install yarn --location=global --force
RUN yarn install
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn create-all-tables
RUN yarn webpack

ENV NODE_ENV=production
ENV PORT=9000

EXPOSE 9000

RUN 

CMD ["yarn", "start"]
