#!/bin/bash

echo "Building the application..."

# Clean previous build
rm -rf dist

# Install dependencies
npm install

# Build the React app
npm run build

echo "Build completed!"
echo "Dist directory contents:"
ls -la dist/