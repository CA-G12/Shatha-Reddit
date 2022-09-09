const connection = require('../server/database/config/connection');
const buildFunc = require('../server/database/config/build')
const {
  addCommentQuery, addPostQuery, getCommentsQuery, getPostsQuery, addUserQuery,
} = require('../server/database/queries/index');

beforeAll(() => buildFunc());

test('test for getData function', () => {
  getPostsQuery().then((data) => {
    expect(data.rows.length).toBe(4);
  });
});

test('test for get comments query', () => {
  getCommentsQuery('2').then((data) => {
    expect(data.rows.length).toBe(2);
  });
});

test('test for add post query', () => {
  addPostQuery('title post 5', 'content for post 5', 3).then((data) => {
    expect(data.rows[0].id).toBe(5);
    expect(data.rows[0].title).toBe('title post 5');
  });
});

test('test for add comment query', () => {
  addCommentQuery('hello world', 3, 2).then((data) => {
    expect(data.rows[0].comment).toBe('hello world');
  });
});

test('test for add user query', () => {
  addUserQuery('alaa', 'alaa123@gmail.com', 'alaa1234').then((data) => {
    expect(data.rows[0].email).toBe('alaa123@gmail.com');
    expect(data.rows[0].password).toBe('alaa1234');
  });
});

afterAll(() => connection.end());
