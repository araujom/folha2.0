#!/bin/bash
echo 2
/etc/init.d/mongod start
echo 4
sleep 5
echo 6
DIRECTORY="/mongobackup"
echo 8
if [ -d "$DIRECTORY" ]; then
echo 10
    echo "Restoring: "
echo 12
    mongorestore --drop $DIRECTORY
echo 14
    rm -rf $DIRECTORY
echo 16
else
echo 18	
    echo "NO DIR!!!"
echo 20
fi
echo 22
/etc/init.d/mongod stop
echo 24