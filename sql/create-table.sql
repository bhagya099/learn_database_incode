DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS schedules;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(266) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE  schedules (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    day INT NOT NULL CHECK(day BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT fk_users 
      FOREIGN KEY(user_id) 
       REFERENCES users(user_id)
       ON DELETE CASCADE
);