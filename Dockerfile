#build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN echo -e "{\n\t\"APIServiceBaseUrl\":\"/api\",\n\t\"ChartServiceBaseUrl\":\"/chart\"\n}" > /usr/share/nginx/html/config.json
COPY  nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
