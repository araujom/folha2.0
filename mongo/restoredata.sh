#!/bin/bash
service mongodb start
sleep 5
DIRECTORY="/mongobackup"
if [ -d "$DIRECTORY" ]; then
    echo "Restoring: "
    mongorestore --drop $DIRECTORY
    rm -rf $DIRECTORY
else
    echo "NO DIR!!!"
fi
service mongodb stop