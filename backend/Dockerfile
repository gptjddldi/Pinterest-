FROM python:3.6-slim
ENV PYTHONUNBURRERED=1
RUN apt-get update \
    && apt-get install -y --no-install-recommends
    
WORKDIR /djangoProject
ADD . /djangoProject
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 80
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:80"]