# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* package-lock.json* ./

RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

COPY . .
RUN if [ -f pnpm-lock.yaml ]; then pnpm run build; else npm run build; fi

FROM nginx:1.27-alpine AS runner

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
