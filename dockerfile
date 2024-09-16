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

# Install 'serve' globally to serve the built files
RUN yarn global add serve

# Expose the port the app will run on
EXPOSE 5000

# Use 'serve' to serve the built files from the 'dist' folder
CMD ["serve", "-s", "dist", "-l", "5000"]
