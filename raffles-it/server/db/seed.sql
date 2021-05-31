DROP DATABASE if exists rafflesit;
CREATE DATABASE rafflesit;

\c rafflesit;

CREATE TABLE raffles
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    secret_token VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    raffled_at TIMESTAMPTZ, 
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
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO raffles (name, secret_token, winner_id)
VALUES ('raffle #1','win123', 2),
        ('raffle #2','hello123', 1);

INSERT INTO users
    (firstname, lastname, raffle_id, email, phone)
VALUES
    ('Johanne', 'Enama', 1, 'je@email.com', '+ 1(123)-456-7890'),
    ('John', 'Doe', 2, 'john@doe.com', '+1(000)-000-0000');


ALTER TABLE raffles  
ADD CONSTRAINT fk_winner_id FOREIGN KEY
(winner_id) REFERENCES users
(id);

