FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update && \  
    apt-get -y install mongodb-server 

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data
ADD ./mongo_restore_start /data/mongo_restore_start

# Define default command.
CMD ["mongo_restore_start"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
