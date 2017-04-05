FROM armhf/alpine

RUN apk add --update --no-cache docker

COPY tasks/ /etc/periodic/
RUN chmod -R +x /etc/periodic/

CMD ["crond", "-f", "-d", "8"]
