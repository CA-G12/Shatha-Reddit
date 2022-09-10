BEGIN;

DROP TABLE IF EXISTS users, posts, comments, votes CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);

INSERT INTO users(user_name,email,password) 
VALUES
('ahmed', 'ahmed123@gmail.com', '$2a$15$XBZ/9jJ8pzBEUZ2FHo01e.fFDwnpYjQcP711Slod9JcuDi7iYRkHG'), --ahmed1234
('omar', 'omar123@gmail.com', '$2a$15$enzNE.WS5l60yAaIk1zHHOZPGx2A43nCrS0yHTuzaNmwPNO3ibCQi'), --omar1234
('shatha', 'shatha123@gmail.com', '$2a$15$0h2ZeCKhZ9mr5Pu71g1zYegjtCTiO0QuM8jlSi5a3v0mGhTrwWJ0S'); --shatha1234

INSERT INTO posts(title,content,user_id) 
VALUES 
('My First Post','very happy to see you here, enjoy in website journey',3),
('post 2','just to try add more posts',1),
('post 3','hello every one',2);

INSERT INTO comments(user_id,post_id,comment) 
VALUES
(1,1,'great work'),
(2,1,'hello firts post'),
(3,2,'comment for test'),
(3,3,'comment for test'),
(2,3,'hello third post'),
(1,2,'hello second post');

INSERT INTO votes(user_id,post_id,type)
VALUES
(1,2,'up'),
(1,3,'down'),
(2,1,'up'),
(3,2,'up'),
(2,3,'down'),
(1,3,'down'),
(3,1,'up');

COMMIT;