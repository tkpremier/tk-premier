# ========= Build stage =========
FROM node:22 AS builder

WORKDIR /usr/src/app

# Install dependencies (cached layer)
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && \
  yarn install --frozen-lockfile

# Copy source and build
COPY . .
# Make sure package.json has: "build": "tsc" or whatever your build step is
RUN yarn build

# ========= Runtime stage =========
FROM node:22 AS runner

WORKDIR /usr/src/app


# Copy only package metadata and install prod deps
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && \
  yarn install --frozen-lockfile --production=true

# Copy built output from builder
COPY --from=builder /usr/src/app/dist ./dist

# If you have extra runtime assets, copy them too:
# COPY --from=builder /usr/src/app/public ./public

EXPOSE ${API_PORT}

# Adjust path if your entry file differs
CMD ["node", "dist/server.bundle.js"]
