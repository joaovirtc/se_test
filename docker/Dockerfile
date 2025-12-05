# Escolhe uma imagem base do Node.js
FROM node:20-alpine

# Instala PM2 globalmente via npm
RUN npm install -g pm2

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compila o projeto Next.js
RUN npm run build


# Expõe a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pm2-runtime", "npm", "--", "start"]
