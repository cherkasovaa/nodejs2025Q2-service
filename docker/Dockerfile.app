FROM node:24
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://admin:admin@postgres:5432/library_db?schema=public"
RUN npx prisma generate
RUN npm run build
EXPOSE 4000
CMD [ "npm", "run", "start:docker" ]