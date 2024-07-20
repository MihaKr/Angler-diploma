#!/bin/bash
set -e

requirements_path="requirements.txt"
docker_compose_path="docker-compose.yml"
venv_path="angler_backend/.venv"

# Function to create a Python virtual environment
create_python_venv() {
    local venv_dir=$1
    echo "Creating Python virtual environment in $venv_dir..."
    python3 -m venv $venv_dir
    echo "Python virtual environment created successfully."
}

# Function to install Python dependencies
install_python_dependencies() {
    local requirements_file=$1
    echo "Installing Python dependencies from $requirements_file..."
    source $venv_path/bin/activate
    python3 -m pip install --upgrade pip
    python3 -m pip install -r $requirements_file
    deactivate
    echo "Python dependencies installed successfully."
}

# Function to apply Django migrations
apply_django_migrations() {
    echo "Applying Django migrations..."
    source $venv_path/bin/activate
    python3 ./angler_backend/manage.py migrate  
    python3 ./angler_backend/manage.py insert_data
    deactivate
    echo "Django migrations applied successfully."
}

# Function to start the Django server headless
start_django_server() {
    echo "Starting Django server in headless mode..."
    source $venv_path/bin/activate
    python3 ./angler_backend/manage.py runserver 0.0.0.0:8000 
    deactivate
    echo "Django server started."
}

# Function to run Docker Compose
run_docker_compose() {
    local compose_file=$1
    echo "Running Docker Compose with $compose_file..."
    docker-compose -f $compose_file up --detach
    echo "Docker Compose is up and running."
}

# Create Python virtual environment
create_python_venv $venv_path

# Install Python dependencies
install_python_dependencies $requirements_path

# Run Docker Compose
run_docker_compose $docker_compose_path 

sleep 3

# Apply Django migrations
apply_django_migrations

# Start the Django server headless
start_django_server

echo "Script execution completed."
