FROM node:16.6.1 
USER node 

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app 

COPY --chown=node:node . . 

RUN npm install 

USER root
RUN apt-get update -y
RUN apt-get install -y aria2

RUN mkdir -p /vol/web/media

RUN adduser user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web

USER user

EXPOSE 5000

CMD ["npm" , "start"]
