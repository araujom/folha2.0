#!/bin/sh
chown -R root:root data/db
mongodb mongod --repair --dbpath /var/lib/mongodb/
mongod
