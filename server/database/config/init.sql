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
('ahmed', 'ahmed123@gmail.com', 'ahmed1234'),
('omar', 'omar123@gmail.com', 'omar1234'),
('shatha', 'shatha123@gmail.com', 'shatha1234');

INSERT INTO posts(title,content,user_id) 
VALUES 
('post1','content for post one',1),
('post2','content for post two',1),
('post3','content for post three',3),
('post4','content for post four',2);

INSERT INTO comments(user_id,post_id,comment) 
VALUES
(1,2,'comment for post 2'),
(2,2,'comment for post 2'),
(3,4,'comment for post 4'),
(3,1,'comment for post 1'),
(2,1,'comment for post 1'),
(1,3,'comment for post 3');

INSERT INTO votes(user_id,post_id,type)
VALUES
(1,2,'up'),
(1,3,'down'),
(2,4,'up'),
(3,2,'up'),
(2,4,'down'),
(1,4,'down'),
(3,1,'up');

COMMIT;