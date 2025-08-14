

### Command for Named Volume

1. build the image: 
  $ docker build -t node-example:volume

2. run the container with volume: 
  $ docker container run -p 3000:80 -d --name node-example -v feedback:/app/feedback node-example:volume

Docker Udemy lecture link: https://www.udemy.com/course/docker-kubernetes-the-practical-guide/learn/lecture/22166912#notes

### To work with Anonymous Volume follow below instruction:

1. open Dockerfile

2. un-command line 16  VOLUME [ "/app/feedback" ] 

3. open docker desktop

4. open terminal in vs code and run 2 command bellow
  $ docker build -t node-example

  $ docker container run -p 3000:80 -d --name node-example node-example


### to work with Bind mounted
1. Copy the path of server.js in this project
  example: C:\Users\Admin\OneDrive\Documents\Udemy\Backend-Udemy\Docker\data-volumes-01-starting-setup\server.js

  let focus on parent C:\Users of path (we need assign this path to docker setting for using bind mount concept)

1. open docker desktop application

2. go to the setting of docker desktop application

3. go to Resource -> then go to File Sharing

4. add path to parent folder C:\Users (we get this at step 1)

5. build the image (remember un-command line 16 in Docker file, we do not need it in bind mount concept)
  $ docker build -t node-example

6. assign path we get at step 1 to this command (remember remove the path \server.js)

  remove the path \server.js 
  Before remove ->  C:\Users\Admin\OneDrive\Documents\Udemy\Backend-Udemy\Docker\data-volumes-01-starting-setup\server.js
  After remove -> C:\Users\Admin\OneDrive\Documents\Udemy\Backend-Udemy\Docker\data-volumes-01-starting-setup (add this to bellow command)

  $ docker container run -p 3000:80 -d --name node-example -v feedback:/app/feedback -v "C:\Users\Admin\OneDrive\Documents\Udemy\Backend-Udemy\Docker\data-volumes-01-starting-setup:\app" node-example

7. execute command in step 6

  -> you will see error inside the logs of the container : "Cannot find module 'express'"
  -> there is error because the folder contains your code will overwrite folder /app
  -> but folder contains your code there is no node_modules
  -> then you need to add another anonymous volume to command -v /app/node_modules (this mean this folder will not be overwrite by bind mount of the docker )

  -> final command 
  $ docker container run -p 3000:80 -d --name node-example -v feedback:/app/feedback -v "C:\Users\Admin\OneDrive\Documents\Udemy\Backend-Udemy\Docker\data-volumes-01-starting-setup:\app" -v /app/node_modules node-example

Just a quick note: If you don't always want to copy and use the full path, you can use these shortcuts:

macOS / Linux: -v $(pwd):/app

Windows: -v "%cd%":/app

Udemy lecture for Bind mount with docker link: https://www.udemy.com/course/docker-kubernetes-the-practical-guide/learn/lecture/22166914#notes
 