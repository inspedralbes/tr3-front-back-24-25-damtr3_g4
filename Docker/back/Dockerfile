FROM node:23-bullseye

RUN apt-get update && apt-get install -y python3 python3-pip python3-dev

WORKDIR /app

COPY package*.json ./
COPY requirements.txt ./

RUN npm install --no-bin-links

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 3020 5000

CMD sh -c "npm start & python3 app.py"
