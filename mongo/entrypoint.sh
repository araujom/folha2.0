#!/bin/sh
DIRECTORY="/data/db"
if [ -d "$DIRECTORY" ]; then
  echo "Restoring data from previous container"
  chown -R root:root $DIRECTORY
  mongod --repair --dbpath $DIRECTORY
else
  echo "No Restore needed"
fi
exec $@
