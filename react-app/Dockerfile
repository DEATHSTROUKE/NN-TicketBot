FROM node as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
ENV REACT_APP_SERVER_NAME='https://ticket-bot.online/api'
ENV REACT_APP_SERVER_NAME_PUBLIC='https://ticket-bot.online/'
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
