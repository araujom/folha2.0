FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update
RUN apt-get -y install mongodb-server

# ENTRYPOINT /entrypoint.sh

# Define default command.
CMD mongod

# Expose ports.
EXPOSE 28017
