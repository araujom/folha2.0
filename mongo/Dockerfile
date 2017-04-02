FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update
RUN apt-get -y install mongodb-server
RUN mkdir /bakup

# Define mountable directories.
VOLUME /data/db

#ENTRYPOINT /entrypoint.sh

ADD ./backup/mongobackup /backup/mongobackup
ADD ./init_mongo.sh /init_mongo.sh

# Define default command.
CMD /init_mongo.sh

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
