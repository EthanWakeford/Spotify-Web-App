FROM python:3.10-slim

ARG PORT=5000
ENV PORT=${PORT}

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE ${PORT}

CMD ["/bin/bash", "-c", "python3 -m flask run --host=0.0.0.0 --port=$PORT"]
