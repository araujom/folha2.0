FROM hypriot/rpi-node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY server.js /usr/src/app
ADD models /usr/src/app/models

CMD [ "node", "server.js" ]