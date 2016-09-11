#!/bin/bash

export HOST="172.17.0.1"
#export HOST="localhost"

#APP
export PORT="80"
export COOKIE_SECRET="SUPERSECRETCOOKIE"

#REDIS
export REDIS_URL="redis://$HOST:6379"

#DB
export RDB_HOST=$HOST
export RDB_PORT="28015"