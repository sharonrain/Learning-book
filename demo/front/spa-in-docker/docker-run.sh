#!/bin/bash
docker build -f Dockerfile -t docker-spa .
docker run -p 8888:80 docker-spa
#docker rmi -f docker-spa