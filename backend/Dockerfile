FROM python:3
ENV PYTHONUNBURRERED=1
ENV DOCKER_BUILDKIT=1
ENV JAVA_HOME /usr/lib/jvm/java-1.7-openjdk/jre

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && apt-get install -y g++ default-jdk

WORKDIR /djangoProject
ADD . /djangoProject
RUN pip3 install -r requirements.txt
COPY . /djangoProject

EXPOSE 80
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:80", "--timeout", "120"]
