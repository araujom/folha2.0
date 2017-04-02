FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update
RUN apt-get -y install mongodb-server
RUN mkdir /bakup

# Define mountable directories.
VOLUME /data/db

ADD ./backup/mongobackup /backup/mongobackup
ADD ./entrypoint.sh /entrypoint.sh
ENTRYPOINT /entrypoint.sh

# Define default command.
#CMD mongod

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
