# Step 1: Build phase
# Step 1: Build phase
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from chatty
COPY frontend/chatty/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY frontend/chatty .

# Build the project
RUN npm run build

# Step 2: Serve phase
FROM nginx:alpine

# Copy the build folder from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
