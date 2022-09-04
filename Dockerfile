FROM node:16-alpine 
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build
ENV NODE_ENV production
ENV REACT_APP_API_KEY 9973533
EXPOSE 3000
CMD [ "npx", "serve", "build" ]