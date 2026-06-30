# Node.js als Basis-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json .
RUN npm install

# restlichen Code kopieren
COPY . .

# Port freigeben
EXPOSE 3000

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# App starten
CMD ["node", "index.js"]