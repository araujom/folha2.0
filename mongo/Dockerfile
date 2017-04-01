FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update && \  
    apt-get -y install mongodb-server 
RUN mkdir -p /restore

# Define mountable directories.
VOLUME ["/data/db"]


# Define working directory.
ADD ./entrypoint.sh /entrypoint.sh
ADD ./onstartup.sh /onstartup.sh
ADD ./shared/mongobackup /restore/mongobackup


ENTRYPOINT /entrypoint.sh

# Define default command.
CMD /onstartup.sh

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
