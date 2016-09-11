VERSION=`cat ./db/version`
docker build -t waieez/league-db:$VERSION -f Dockerfile_DB .