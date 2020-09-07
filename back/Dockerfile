 FROM node:12.14.1-alpine

# create destination directory
USER root
RUN mkdir -p /usr/src/ms-hcp-js
WORKDIR /usr/src/ms-hcp-js

# copy and archivos
COPY . /usr/src/ms-hcp-js

# instalar las dependencias
RUN npm install

# instalar pm2 
RUN npm install pm2 -g

#expone el puerto
EXPOSE 5000

# comando para levantar microservicio
CMD ["pm2-runtime", "main.js"]