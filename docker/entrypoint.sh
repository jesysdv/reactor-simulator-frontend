
#!/bin/bash

# File to be executed when the container starts
# It will start the vue.js application

# Variables
# Current Working Directory
CWD=/app

# Change to the working directory
cd $CWD

# Start the application/container (nginx)
# npm run serve -- --port 9000 & nginx -g 'daemon off;'
nginx -g "daemon off;"
