# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock into the container at /app
COPY Pipfile Pipfile.lock /app/

# Install the dependencies from Pipfile.lock
RUN pipenv install --deploy --ignore-pipfile

# Setting the PATH to use pipenv for the following commands
ENV PATH="/root/.local/bin:$PATH"

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 8000 available to the world outside this container
EXPOSE 8000
