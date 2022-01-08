# build frontend
FROM node:16 as js-builder
ENV GENERATE_SOURCEMAP=false

WORKDIR /app
COPY . /app
RUN npm install

RUN export REACT_APP_VERSION=`git describe --always --tags`; \
  npm run build

# build final image
FROM nginx:stable-alpine
COPY --from=js-builder /app/build /usr/share/nginx/html
