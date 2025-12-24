FROM node:20-bullseye

# SSH kurulumu
RUN apt-get update && \
    apt-get install -y openssh-server && \
    mkdir /var/run/sshd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x /app/start.sh

EXPOSE 22
EXPOSE 3000

CMD ["/app/start.sh"]
