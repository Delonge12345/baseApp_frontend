FROM node:14
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn --ignore-scripts
RUN yarn build-dev

FROM nginx:alpine
COPY --from=0 /app/build/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]



