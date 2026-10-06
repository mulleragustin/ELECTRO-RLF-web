# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build && pnpm prune --prod

# Servidor Node: render en servidor (SEO) + proxy de la tienda hacia gestión.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=80 \
    GESTION_URL=https://gestion.electrorlf.com.ar

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1

CMD ["node", "server.js"]
