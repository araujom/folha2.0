#!/bin/bash


DIRECTORY="/restore/mongobackup"
if [ -d "$DIRECTORY" ]; then
    echo "Restoring: "
    mongorestore --drop $DIRECTORY
    rm -rf $DIRECTORY
else
    echo "NO DIR!!!"
fi
