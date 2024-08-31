# Angler

## Description
A brief description of what this project is about and what it aims to achieve.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MihaKr/Angler-diploma.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Angler-diploma
   ```
3. Create docker network:
   ```bash
   docker network create -d bridge angler-net
   ```

4. Run docker-compose:
   ```bash
   docker compose up
   ```

## Usage
Before the first use, you must enter the backend container and run the entrypoint.sh script, this script will populate the db with core data.

The application is accesible on ... . 

The user must first create an application using the user interface. He must provide an applicatoin name, a short description and which module groups he will use. After the app is created the user can build a pipiline, this is done using the drag and drop functionality to drag components from the menu on the right. Components can then be connected by dragging from one output to the input of another Component. Some component can also be configured, using the settings menu accesible by double clicking on a pipline component.
 
The pipline is run using the Run App button 

more info about the apliaction can be found in the undergraduate thesis: