# build frontend
FROM node:19 as js-builder
ENV GENERATE_SOURCEMAP=false

WORKDIR /app
COPY . /app
RUN npm install

RUN export REACT_APP_VERSION=`git describe --always --tags`; \
  echo "version="$REACT_APP_VERSION; \
  npm run build

# build final image
FROM nginx:stable-alpine
COPY --from=js-builder /app/build /usr/share/nginx/html
