# Node.js als Basis-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json .
RUN npm install

# restlichen Code kopieren
COPY . .
RUN npm run build
# Port freigeben
EXPOSE 3000

# Production-Phase
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# App starten
CMD ["node", "index.js"]