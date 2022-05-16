FROM python:alpine3.15

RUN apk add --update --no-cache openssh 

RUN adduser -h /home/rob -s /bin/sh -D rob
RUN echo -n 'rob:rob' | chpasswd

COPY id_rsa.pub id_rsa.pub
RUN mkdir /home/rob/.ssh
RUN touch /home/rob/.ssh/authorized_keys
RUN cat id_rsa.pub >> /home/rob/.ssh/authorized_keys

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 22
COPY *.py /home/rob/app
