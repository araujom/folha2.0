FROM resin/rpi-raspbian:latest  

# Install MongoDB.
RUN apt-get update && \ 
    apt-get install -y build-essential python-dev && \
    apt-get install -y python-pip iceweasel xvfb xserver-xephyr vnc4server && \
    pip install PyVirtualDisplay xvfbwrapper selenium pymongo

ADD ./scrap_records.py /scrap_records.py
ADD ./config.py /config.py
ADD ./geckodriver /usr/local/bin/geckodriver

# Define default command.
CMD ["/usr/bin/python", "/scrap_records.py"]
