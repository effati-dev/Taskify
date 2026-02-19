FROM node:lts-alpine3.22 AS build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
FROM build AS publish
EXPOSE 8000
CMD [ "npm", "start" ]