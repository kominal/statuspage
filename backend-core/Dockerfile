FROM node:18-alpine
WORKDIR /usr/src/app/
ENV NODE_ENV production
COPY package.json /usr/src/app/
COPY dist/ /usr/src/app/
COPY node_modules /usr/src/app/node_modules
CMD ["node", "--unhandled-rejections=strict", "main.js"]
