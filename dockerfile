FROM node:latest
ADD src /app/src
ADD package.json /app/package.json
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 3000
CMD [ "npm","start"]