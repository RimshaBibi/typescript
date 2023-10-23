# User Registration and Authentication System

This is a simple user registration and authentication system with a Fastify server and a web application front end.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [UserRegisteration](#user-registration)
  - [UserAuthentication](#user-authentication)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (with npm)
- [PostgreSQL](https://www.postgresql.org/) (for the database)

1. Clone the repository:

   ```sh
   git clone https://github.com/RimshaBibi/typescript.git
   cd typescript
2. Install Node.js dependencies:

   ```sh
   npm install
3. Create a PostgreSQL database and configure the connection in your .env file. Set the following environment variables:

   ```sh
   mailPassword=you_mail_password
   dbUser=your_db_user
   dbPassword=your_db_password
   host=your_db_host
4. Run the TypeScript build process and start the server:

   ```sh
   npm run start
5. Access the web application by opening your browser and navigating to http://localhost:8080.
## Usage
- Visit http://localhost:8080 in your web browser to use the user registration and authentication system.
Sign up and sign in using the provided forms.
## Endpoints

### User Registration
- **POST /signup**
  - Description: Register a new user with a unique email.
  - Request Body:
    - `userName` (string, required): User's name.
    - `userEmail` (string, required, format: email): User's email address.
    - `userPassword` (string, required): User's password.
  - Response:
    - 201 (Created): User registration successful.
      - `user_id` (string): Unique user identifier.
      - `userName` (string): User's name.
      - `userEmail` (string): User's email.
      - `salt` (string): Salt used for password hashing.
      - `newPassword` (string): Hashed password.
    - 409 (Conflict): User with the provided email already exists.
    - 500 (Internal Server Error): Registration failed due to an internal error.

### User Authentication
- **POST /signin**
  - Description: Authenticate a user.
  - Request Body:
    - `userEmail` (string, required, format: email): User's email address.
    - `userPassword` (string, required): User's password.
  - Response:
    - 200 (OK): User authentication successful.
      - `userEmail` (string): User's email.
      - `userPassword` (string): Hashed password.
    - 401 (Unauthorized): User does not exist or wrong password.
    - 500 (Internal Server Error): Authentication failed due to an internal error.
### Contributing
Contributions are welcome! Please follow these guidelines:

- Fork the repository.
- Create your feature branch: 
    ```sh
    git checkout -b <your_branch_name>
- Commit your changes: 
   ```sh
  git commit -m 'New feature added'
- Push to the branch: 
   ```sh
   git push origin <your_branch_name>
- Open a pull request.

### License
This project is licensed under the [MIT License](LICENSE).

### Contact
For questions or support, contact [Rimsha Bibi on LinkedIn](https://www.linkedin.com/in/rimsha-bibi-443745204 "LinkedIn ID").




   