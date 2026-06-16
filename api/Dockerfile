################
# Stage 1: BUILDER
#################

FROM node:24-alpine AS build

WORKDIR /var/www/html

COPY package*.json ./

RUN npm ci

COPY src/ ./src/
COPY prisma/ ./prisma/
COPY prisma.config.ts ./

RUN npx prisma generate

#################
# Stage 2: DEVELOPMENT
#################

FROM node:24-alpine AS development

WORKDIR /var/www/html

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node src/ ./src/
COPY --chown=node:node prisma/ ./prisma/
COPY --chown=node:node prisma.config.ts ./

RUN chown -R node:node /var/www/html && chmod -R 755 /var/www/html

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]

#################
# Stage 3: PRODUCTION
#################

FROM node:24-alpine AS production

WORKDIR /var/www/html

COPY package*.json ./

# Full install: prisma CLI needed at startup for migrate deploy
RUN npm ci

# Copy source and generated Prisma client from builder
COPY --from=build /var/www/html/src ./src
COPY prisma/ ./prisma/
COPY prisma.config.ts ./

USER node

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
