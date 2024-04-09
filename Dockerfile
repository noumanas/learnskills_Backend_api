FROM node:16-alpine

# Install Puppeteer's dependencies
RUN apk add --no-cache \

# Set up the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["npm", "start"]