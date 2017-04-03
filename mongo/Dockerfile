FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update
RUN apt-get -y install mongodb-server
RUN mkdir /bakup
ADD ./backup/mongobackup /mongobackup
ADD ./restoredata.sh /restoredata.sh
#RUN restoredata.sh
RUN /bin/bash -c  "/usr/bin/mongod &" && \
 	 sleep 5 && \
	 mongorestore --drop /mongobackup

# Define mountable directories.
VOLUME /data/db

# ENTRYPOINT /entrypoint.sh

# Define default command.
CMD mongod

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
