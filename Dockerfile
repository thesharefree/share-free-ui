FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:1.23-alpin
COPY --from=build /usr/src/app/dist/share-free-ui /usr/share/nginx/html