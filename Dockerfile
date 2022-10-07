FROM node:16-slim AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM node:16-slim
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]