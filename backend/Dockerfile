FROM node:20
WORKDIR /app
COPY . .
RUN apt update && apt install -y make && npm ci && npm run prisma:generate
EXPOSE 5002
CMD ["make", "start"]
