Members Hub
This is the Members Hub project that Create, Read, Update and Delete Hubsters. It includes both server-side and client-side applications. The server-side is built with Express, Apollo Server, and MongoDB, while the client-side is built with React and Apollo Client.

Table of Contents
Installation
Configuration
Usage
Project Structure
API Endpoints
Technologies Used
License
Installation
Server Side
Clone the repository:

sh
Copy code
git clone https://github.com/kkocokoco/BMW_test
cd members-hub/server
Install dependencies:

sh
Copy code
npm install
Create an .env file in the root directory with the following content:

env
Copy code
PORT=6001
MONGO_URI=mongodb://localhost:27017
Client Side
Navigate to the client directory:

sh
Copy code
cd members-hub/client
Install dependencies:

sh
Copy code
npm install
Create an .env file in the root directory with the following content:

env
Copy code
REACT_APP_SERVER_URL=http://localhost:6001
Configuration
Server Side
Ensure that MongoDB is installed and running. Update the MONGO_URI in the .env file with your MongoDB connection string.

Client Side
Ensure that the server-side application is running and the REACT_APP_SERVER_URL in the .env file points to the correct server URL.

Usage
Server Side
Start the server:

sh
Copy code
npm start
The server will run on http://localhost:6001.

Client Side
Start the client application:

sh
Copy code
npm start
The client application will run on http://localhost:3000.

Project Structure
plaintext
Copy code
members-hub/
├── server/
│   ├── schema/
│   │   └── typeDefs.js
│   ├── resolvers/
│   │   └── memberResolvers.js
│   ├── uploads/
│   ├── server.js
│   └── ...
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── apollo/
│   │   │   └── client.js
│   │   ├── components/
│   │   │   ├── Members.jsx
│   │   │   ├── MemberModal.jsx
│   │   │   └── Help.jsx
│   │   ├── assets/
│   │   │   └── css/
│   │   │       └── member_style.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── ...
└── ...
API Endpoints
Server Side
GraphQL
The GraphQL endpoint is available at http://localhost:6001/graphql.

File Uploads
To upload a file, make a POST request to http://localhost:6001/upload.

Technologies Used
Node.js
Express
Apollo Server
MongoDB
Mongoose
React
Apollo Client
React Router
React Bootstrap
License
This project is licensed under the MIT License.

