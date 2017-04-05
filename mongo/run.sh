#!/bin/sh
DIRECTORY="/data/db"
if [ -d "$DIRECTORY" ]; then
  echo "pasta exite"
  chown -R root:root $DIRECTORY
  mongod --repair --dbpath $DIRECTORY
else
  echo "pasta nao exite"
fi
mongod
