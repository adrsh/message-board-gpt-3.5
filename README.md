# message-board-gpt-3.5
A RESTful API for a message board generated by GPT-3.5-turbo

# Information

This RESTful API was generated using the following prompts with OpenAI Playground, settings were temperature 0 and maximum length 2048.

## System prompt
I want you to act as a full stack web developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with MongoDB, Express, and Node.

## User prompt
Your task is to build a RESTful API for a message board web application using MongoDB, Express, and Node. Your API should be able to handle HTTP requests for performing CRUD (Create, Read, Update, Delete) operations on data related to posts and comments made by users. Users should be able to register with a username and password, log in and log out. Only logged-in users are able to create new posts and comments on other posts. The API should be designed to be scalable, efficient, and secure. JSON Web Tokens should be used for authentication and passwords should be hashed using bcrypt. Posts and comments should be limited to 4096 characters.

In addition, you should provide the code, folder structure, and configuration files necessary to run the application, including the exact versions of packages used. The versions of the packages used should be specified in the package.json file.

## Additional information
When text stopped generating because 2048 tokens were reached, maximum length was reduced to stay within limits and "Continue" was prompted to continue generating code.
