DROP TABLE IF exists raffles;
CREATE TABLE raffles
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    secret_token VARCHAR NOT NULL,
    created_at VARCHAR NOT NULL,
    raffled_at VARCHAR DEFAULT NULL,
    winner_id INT DEFAULT NULL
);


DROP TABLE IF exists users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    raffle_id INT REFERENCES raffles(id),
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR ,
    registered_at VARCHAR
);


ALTER TABLE raffles ADD CONSTRAINT fk_users_id FOREIGN KEY (winner_id) REFERENCES users(id);
ALTER TABLE users ADD CONSTRAINT fk_raffles_id FOREIGN KEY (raffle_id) REFERENCES raffles(id);

