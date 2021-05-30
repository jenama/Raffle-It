DROP DATABASE if exists rafflesit;
CREATE DATABASE rafflesit;

\c rafflesit;

CREATE TABLE raffles
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    secret_token VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    raffled_at TIMESTAMPTZ DEFAULT NOW(),
    winner_id INT 
);

-- DROP TABLE IF EXISTS ; 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    raffle_id INT REFERENCES raffles(id),
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR NOT NULL,
    registered_at TIMESTAMPTZ
);

-- DROP TABLE IF EXISTS; cd 


-- ALTER TABLE users
-- ADD CONSTRAINT fk_users_raffles FOREIGN KEY
-- (raffle_id) REFERENCES raffles
-- (id);

INSERT INTO raffles (name, secret_token)
VALUES ('raffle #1','win123'),
        ('raffle #2','hello123');

INSERT INTO users
    (firstname, lastname, raffle_id, email, phone)
VALUES
    ('Johanne', 'Enama', 1, 'je@email.com', '+ 1(123)-456-7890'),
    ('John', 'Doe', 1, 'john@doe.com', '+1(000)-000-0000');


ALTER TABLE raffles
ADD  FOREIGN KEY
(winner_id) REFERENCES users
(id);

-- ALTER TABLE users
-- ADD CONSTRAINT CHK_raffle_id CHECK
-- (raffle_id = 1);