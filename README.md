# Running the Application
## Express backend app
1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a .env file in the root directory and add the following environment variables:

    ```
    MONGODB_URI=<your MongoDB URI>
    SECRET_KEY=<your secret key>
    PORT=<server running port>
    ACCESS_TOKEN_SECRET=<secret key for access token generating>
    REFRESH_TOKEN_SECRET=<secret key for refresh token generating>
    ACCESS_TOKEN_EXPIRE=<expiration time for access token>
    REFRESH_TOKEN_EXPIRE=<expiration time for refresh token>
    ```
4. Run the application by executing `npm start`.

## React frontend app
1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a .env file in the root directory and add the following environment variables:

    ```
    SERVER_API_URL=<server url that serves api endpoints>
    CLIENT_URL=<client base url that the react app is running on>
    ```
4. Run the application by executing `npm start`.


# API Docs
## Todo API Endpoints
- GET /api/task - get all todos
- POST /api/task - create a new todo
- PUT /api/task/:taskId - update a todo by id
- DELETE /api/task/:taskId - delete a todo by id
## Authentication API Endpoints
- POST /api/auth/signup - create a new user
- POST /api/auth/signin - login with an existing user
- POST /api/auth/refresh-token - refresh new access token with refresh token
## User API Endpoints
- GET /api/user - get all users with id and username.

# Challenges Faced and Solutions
Another challenge I faced was implementing debouncing on the search component to improve the user experience. We solved this by creating a custom hook that used setTimeout to debounce user input.

# Deployment Instructions
## Express app deployment
1. Create a GCP account and a new project.
2. In the GCP console, navigate to the Compute Engine section and click on "Create Instance" to create a new virtual machine instance.
3. Select the desired region and zone for the instance and choose an appropriate machine type.
4. Under "Boot disk," select "Ubuntu" as the operating system and choose an appropriate disk size.
5. Under "Firewall," select "Allow HTTP traffic" and "Allow HTTPS traffic" to enable web traffic to the instance.
6. Click on "Create" to create the instance.
7. Once the instance is created, SSH into the instance using the GCP console or a terminal.
8. Install Node.js and NPM on the instance using the following commands:
 
    ```
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm
    ```
9. Clone the code repository for the Express app onto the instance using Git.
10. Install the necessary dependencies for the app executing `npm install`.
11. Start the app using the command `npm start` or node server.js.
12. Test the app by accessing the instance's public IP address in your web browser.

1. Install Firebase CLI: If you haven't already, install the Firebase CLI by running the following command in your terminal:
2. Create a Firebase project: Go to the Firebase console and create a new project. Make a note of the project ID as we will need it later.
3. Build your React app: In your terminal, navigate to the root directory of your React app and run the following command to build your app: `npm run build`
4. Initialize Firebase: Run the following command to initialize Firebase for your app: `firebase init`
5. This will launch a setup wizard in your terminal. Choose the following options:

    ```
    Hosting: Configure and deploy Firebase Hosting sites
    Use an existing project: Select the Firebase project you created in step 2
    What do you want to use as your public directory?: build
    Configure as a single-page app (rewrite all urls to /index.html)?: Yes
    Set up automatic builds and deploys with GitHub?: No
    Deploy your app: Run the following command to deploy your app:
    ```
6. `firebase deploy`