FROM ubuntu:latest

RUN apt-get update && apt-get install -y bash

CMD ["echo", "Hello World"]
