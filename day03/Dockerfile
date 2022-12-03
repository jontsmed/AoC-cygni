FROM debian:stable-slim
RUN apt-get update
RUN apt-get install -y curl unzip
RUN curl https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

COPY solution.js .
COPY input.txt .

CMD bun solution.js