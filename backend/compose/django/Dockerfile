FROM python:3
ENV PYTHONUNBURRERED=1
ENV DOCKER_BUILDKIT=1
ENV JAVA_HOME /usr/lib/jvm/java-1.7-openjdk/jre

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && apt-get install -y g++ default-jdk


RUN apt-get install python3-pip -y && apt-get install python3 -y
WORKDIR /djangoProject
ADD requirements.txt /djangoProject
ADD ./requirements/ /djangoProject/requirements/
RUN pip3 install -r requirements.txt

ADD . /djangoProject/

EXPOSE 80
