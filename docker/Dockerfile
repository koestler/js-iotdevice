# build frontend
FROM node:19 as js-builder
ENV GENERATE_SOURCEMAP=false

WORKDIR /app
COPY . /app
RUN npm install

RUN export VITE_VERSION=`git describe --always --tags`; \
  echo "version="$VITE_VERSION; \
  npm run build

# build final image
FROM nginx:stable-alpine
COPY --from=js-builder /app/build /usr/share/nginx/html
