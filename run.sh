#!/bin/bash

docker rm -f league

VERSION=`cat version`
source env.sh
docker run -d -p 3000:80 --name league \
    -e PORT=$PORT \
    -e COOKIE_SECRET=$COOKIE_SECRET \
    -e REDIS_URL=$REDIS_URL \
    -e RDB_HOST=$RDB_HOST \
    -e RDB_PORT=$RDB_PORT \
    waieez/league-app:$VERSION