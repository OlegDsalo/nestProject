FROM ubuntu:latest
LABEL authors="olaf"

ENTRYPOINT ["top", "-b"]

