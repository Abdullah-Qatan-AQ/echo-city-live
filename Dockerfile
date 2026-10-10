FROM node:22-bookworm-slim
WORKDIR /app
COPY --chown=node:node . .
RUN mkdir -p /data && chown node:node /data
ENV PORT=3000 ECHO_STATE_FILE=/data/world.json NODE_ENV=production
VOLUME ["/data"]
EXPOSE 3000
USER node
CMD ["node", "server.mjs"]
