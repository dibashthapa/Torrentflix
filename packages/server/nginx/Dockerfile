FROM nginxinc/nginx-unprivileged:1-alpine 

COPY ./default.conf /etc/nginx/conf.d/default.conf 

USER root 

RUN mkdir -p /vol/media 
RUN chmod 755 /vol/media 


USER nginx 
