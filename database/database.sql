
CREATE DATABASE userDatabase;

CREATE TABLE usertable(
     user_id UUID PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255),
     user_password VARCHAR(255),
     salt VARCHAR(255)
);

