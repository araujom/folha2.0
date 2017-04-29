FROM resin/rpi-raspbian:latest

# Install update.
RUN apt-get update && \
    apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    

COPY nodefiles/ /
WORKDIR /nodefiles

CMD ["cd nodefiles && node app.js"]

EXPOSE 3000