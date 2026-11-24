FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Variables declared with `static: true` in src/env.ts are baked into the build:
# declare each one here, e.g. ARG PUBLIC_SITE_NAME
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine
WORKDIR /app
# HTTPS ends at Containify's edge: read the forwarded protocol, host and client
# address so url.origin and getClientAddress() are right on every domain.
# Containify sets HOST=::, so the server listens on IPv6 and IPv4.
ENV NODE_ENV=production \
    PORT=3000 \
    PROTOCOL_HEADER=x-forwarded-proto \
    HOST_HEADER=x-forwarded-host \
    ADDRESS_HEADER=x-forwarded-for \
    XFF_DEPTH=1
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/scripts ./scripts
USER node
EXPOSE 3000
CMD ["node", "build"]
