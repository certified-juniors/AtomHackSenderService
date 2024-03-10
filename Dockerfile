# Fetching the minified node image on apline linux
FROM node:slim

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY package*.json /app/

# Installing dependencies
RUN npm install

COPY . .

# Starting our application
CMD [ "npm", "run", "start" ]