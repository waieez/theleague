from node:4.5.0

RUN mkdir -p /mnt
COPY . /mnt
RUN cd /mnt && npm install

EXPOSE 80

ENTRYPOINT ["node", "/mnt/server/index"]