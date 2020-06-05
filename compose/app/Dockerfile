FROM node:current

COPY ["package.json",   "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["npm", "run", "dev"]
