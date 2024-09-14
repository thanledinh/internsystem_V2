# Use the official Node.js 20 image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --force

# Copy all source files to the container
COPY . .

# Build the app using Vite
RUN yarn build

# Expose the port the app will run on
EXPOSE 4173

# Command to run the app in preview mode
CMD ["yarn", "preview"]
