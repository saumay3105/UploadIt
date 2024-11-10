FROM node:18-alpine

WORKDIR /app


COPY package*.json ./
COPY src/ ./src/
COPY server/ ./server/
COPY index.html ./
COPY vite.config.js ./

RUN npm install


RUN npm run build


EXPOSE 3000
EXPOSE 5173


CMD ["sh", "-c", "npm run server & npm run dev"]