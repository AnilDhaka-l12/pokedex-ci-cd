#!/bin/bash

echo "Starting the application..."
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

echo "Starting server..."
node index.js