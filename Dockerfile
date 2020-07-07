FROM node:10.13-alpine
ENV NODE_ENV production
ENV PORT 15002
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 15002
CMD npm start