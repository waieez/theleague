#!/bin/bash

VERSION=`cat version`

docker build -t waieez/league-app:$VERSION .