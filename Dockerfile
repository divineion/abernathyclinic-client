FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
# npm run preview expose sur le port 4173
EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
