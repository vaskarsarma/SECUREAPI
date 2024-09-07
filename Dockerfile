# Dockerfile

# 1. Use the official Node.js image from Docker Hub (LTS version recommended)
FROM node:18.20.3-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files
COPY package*.json ./

# Check if package.json is present
RUN ls -l /app

# 4. Install dependencies
RUN npm install --omit=dev --loglevel verbose

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 7070

# 7. Define the command to run the app
CMD ["npm", "start"]
