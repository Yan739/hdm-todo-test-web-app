# Context

The objective was to follow the instructions from the technical test by cloning and configuring the necessary repositories. The React application functions as the frontend and interacts with a NestJS backend, which manages task-related operations. The database used is MySQL, and Prisma was utilized for managing migrations and data models.

# Implemented Features

## Task Retrieval:

The backend API allows fetching all tasks from the database via a GET /tasks endpoint.
The frontend consumes this endpoint and displays the tasks in a list.

## Task Creation:

A form on the frontend allows users to create a new task.
The data is sent to the backend via a POST /tasks request, which inserts the task into the database.

## Task Editing:

Users can modify the details of an existing task.
Editing is done via a form that pre-fills the task's information. After modification, the task is updated in the database via a PATCH /tasks/:id.

## Task Deletion:

The frontend allows deleting a task by calling the backend with a DELETE /tasks/:id request.

# Challenges Faced

## Understanding the Code and Algorithm

Before starting the implementation, I had to spend some time understanding the existing code and the underlying algorithm. This was necessary to ensure I could effectively work with the current architecture and data flow. Once I had a good grasp of how the system was structured, I was able to proceed with the required modifications and implementations.

## Error and Exception Handling

I encountered errors related to type management and malformed requests. It was necessary to adjust certain parts of the backend code to ensure the data sent by the frontend was valid and that API responses were properly handled.

## Database Connection

Setting up the MySQL database was a key starting point. I configured the necessary connection details through the `.env` file, then ran migrations via Prisma to generate the database structure.

## Frontend-Backend Communication

One of the main challenges was ensuring that the API calls from the frontend to the backend were correct, especially for task creation and updating requests. Using the correct endpoints and sending the right data was crucial.

## Aesthetic Choices:

For the aesthetic design of the interface, I relied on the favorite colors of my girlfriend. This personal touch helped me make design decisions, ensuring that the UI was both functional and visually appealing.

