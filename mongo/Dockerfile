FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update && \  
    apt-get -y install mongodb-server 

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["mongorestore", "--drop", "/tmp/shared/mongobackup/", "&&", "mongod"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
