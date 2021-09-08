DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(266) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    time TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE  posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(266) NOT NULL,
    content VARCHAR(266) NOT NULL,
    time TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_users 
      FOREIGN KEY(user_id) 
       REFERENCES users(id)
);