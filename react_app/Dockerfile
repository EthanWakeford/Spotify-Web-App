FROM node:20-slim as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

# multistage builds

FROM nginx:1.25.1
RUN apt-get update && apt-get upgrade -y
RUN adduser --system --no-create-home --shell /bin/false --group --disabled-login nginx
RUN mkdir /var/run/nginx
RUN chown -R nginx:nginx /var/run/nginx /var/cache/nginx /etc/nginx
USER nginx
WORKDIR /usr/share/nginx/
COPY --from=builder /app/dist/ html/
COPY nginx.conf /etc/nginx/nginx.conf
