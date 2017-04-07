FROM ubuntu:latest

# Install MongoDB.
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y python build-essential python-dev && \
    apt-get install -y python-pip iceweasel xvfb xserver-xephyr vnc4server && \
    pip install PyVirtualDisplay xvfbwrapper selenium pymongo

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:toor' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
