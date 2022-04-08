FROM node:12
# create the application directory
# WORKDIR /usr/src/app

# work directoy
WORKDIR /home/app

# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;
    
# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

# copy .aws credentials folder
COPY ./.aws /root/.aws

# copy package (package.json and package-lock.json) files into application container
COPY ["package.json", "yarn.lock", "./"]

# copy all local files into container
COPY . .

# run the installer to install all dependencies
RUN yarn install

# install global serverless
RUN yarn global add serverless

# expose application default port
EXPOSE 8086

# start the application
CMD [ "yarn", "start" ]
