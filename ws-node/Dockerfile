FROM resin/rpi-raspbian:latest

# Install update.
RUN apt-get update && \
    apt-get install curl

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - && \
    apt-get install -y nodejs

CMD ["node"]
