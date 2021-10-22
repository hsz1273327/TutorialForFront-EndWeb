FROM node:latest
ADD server /app/server
ADD schema /app/schema
ADD package.json /app/package.json
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 5000
CMD [ "npm","start"]