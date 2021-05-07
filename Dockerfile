# The Docker image we're creating is based on the NodeJS 10 image.
FROM node:14
 
# Create app directory
WORKDIR /etc/testapp
 
# Install app dependencies files.
COPY package*.json ./
 
# Install the dependencies.
RUN npm install
 
# Bundle app source.
COPY . .
 
# Open port 80
EXPOSE 80
 
# Run Node.js
ENTRYPOINT [ "node", "server.js" ]