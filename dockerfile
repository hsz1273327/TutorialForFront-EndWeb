FROM --platform=$TARGETPLATFORM node:alpine
WORKDIR /code
ADD package.json /code/package.json
RUN npm install
ADD api_server /code/api_server
ENTRYPOINT [ "npm", "start" ]