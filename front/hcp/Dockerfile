FROM node:12.14.1-alpine

# create destination directory
RUN mkdir -p /usr/src/hcp
WORKDIR /usr/src/hcp
# copy and archivos
COPY . /usr/src/hcp

# instalar las dependencias
RUN npm install --save

# run build for deploy app react
RUN npm run build

# instalar server for run static files 
RUN npm install -g serve

#expose port
EXPOSE 3000

# comando para levantar microservicio
CMD ["serve", "-s", "build", "-l", "3000"]