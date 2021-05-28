DROP DATABASE if exists rafflesit;
CREATE DATABASE rafflesit;

\c rafflesit;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    raffle_id INT,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    registered_at  TIMESTAMPTZ
);

CREATE TABLE raffles
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    secret_token VARCHAR,
    created_at TIMESTAMPTZ,
    raffled_at TIMESTAMPTZ,
    winner_id INT REFERENCES users(id)
);



INSERT INTO users (firstname, lastname, raffle_id, email, phone, registered_at)
VALUES ('Johanne', 'Enama', 1, 'je@email.com', '+ 1(123)-456-7890', '2021-05-28 19:10:25-07');

INSERT INTO raffles (name, secret_token, created_at, raffled_at, winner_id)
VALUES ('raffle #1','win123', '2021-05-28 19:10:25-07', '2021-05-28 19:10:25-07', 1)