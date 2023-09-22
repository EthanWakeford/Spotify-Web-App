FROM python:3.10-slim

ARG PORT=5000
ENV PORT=${PORT}

ARG CLIENT_SECRET
ENV CLIENT_SECRET=${CLIENT_SECRET}

ARG CLIENT_ID
ENV CLIENT_ID=${CLIENT_ID}

ARG REDIRECT_URL
ENV REDIRECT_URL=${REDIRECT_URL}

ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE ${PORT}

CMD ["/bin/bash", "-c", "python3 -m flask run --host=0.0.0.0 --port=$PORT"]
