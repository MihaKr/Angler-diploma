# Angler

## Description
ANGLEr is an open-source application designed to simplify the creation of Natural Language Processing (NLP) pipelines by offering a user interface that allows users to build and customize their own NLP pipelines. The platform democratizes access to NLP tools, enabling researchers and developers alike to create powerful language processing workflows.

To enhance flexibility and scalability, ANGLEr integrates Docker for managing and deploying components as isolated containers. Each component is packaged as a Docker container, ensuring a consistent and reproducible environment across different systems. This containerized approach allows users to incorporate custom plugins or third-party components, regardless of the programming language used, without worrying about dependency conflicts. Docker also enables seamless scaling, making it easy to run pipelines in various environments, from local machines to cloud-based servers, while maintaining performance and reliability. With Docker, ANGLEr provides a robust, modular, and extensible framework that adapts to the evolving needs of NLP workflows.

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
