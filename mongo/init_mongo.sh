#!/bin/bash
mongod &
sleep 5
DIRECTORY="/bakup/mongobackup"
if [ -d "$DIRECTORY" ]; then
    echo "Restoring: "
    mongorestore --drop $DIRECTORY
else
    echo "NO DIR!!!"
fi

