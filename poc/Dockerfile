# # FROM ./doubler/dockerfile AS Doubler

# # FROM alpine as Builder

# # RUN docker build -t doubler -f ./doubler/Dockerfile
# # RUN docker build -t rest-server -f ./rest-server/Dockerfile

# FROM alpine:3.15 as builder

# WORKDIR /usr/src/app

# FROM doubler as doubler

# COPY . ./

# FROM rest-server as server

# COPY . ./

# EXPOSE 3000

# CMD ["yarn", "start"]

FROM doubler as doubler
COPY . ./doubler-src

FROM rest-server as server
COPY . ./server-src

FROM alpine:3.15

COPY --from=doubler . ./foo/
COPY --from=server . ./bar/
# COPY --from=doubler ./doubler-src ./foo/
# COPY --from=server ./server-src ./bar/

WORKDIR /usr/src/app

CMD ["yarn", "start"]
