This is docker container utility. that mean you can create new project without install needed environment in your local host machine.
- You can run node project or other programming languages without install it. in order to do it you need to config docker file with needed environment for project(node, etc...) and config docker file compose

- you need to bind mount your local host file with docker project in docker compose file

- add ENTRYPOINT into docker file

- to download dependencies docker-compose run npm(this is name of service) --rm install <package name> --save or --save-dev

- to start project docker compose up