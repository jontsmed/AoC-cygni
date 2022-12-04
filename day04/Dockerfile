FROM debian:stable-slim
RUN apt-get update
RUN apt-get install -y curl unzip
RUN curl https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# COPY package.json bun.lockb ./
# RUN  bun install

COPY solution.js .
# COPY tsconfig.json .
COPY input.txt .

CMD bun solution.js