#!/bin/bash

docker rm -f rethinkdb
docker rm -f redis

docker run --name redis -d -p 6379:6379 redis
docker run --name rethinkdb -v "$PWD:/data" -d -p 8080:8080 -p 28015:28015 -p 29015:29015 rethinkdb