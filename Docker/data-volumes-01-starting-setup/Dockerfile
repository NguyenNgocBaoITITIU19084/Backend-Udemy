FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

# we want data inside the feedback folder is still alive when container is removed 
# so we create the volume for that folder
# this is anonymous volume, it will be remove when container was removed, and anonymous volume was managed by docker
# VOLUME [ "/app/feedback" ] 

CMD [ "npm", "run", "dev" ]