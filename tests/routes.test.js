const supertest = require('supertest');
const app = require('../server/app');

describe('test routes', () => {
  test('test for get all post router', (done) => {
    supertest(app)
      .get('/posts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].title).toBe('post1');
        done();
      });
  });

  test('test for get comments router', (done) => {
    supertest(app)
      .get('/comments/2')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].comment).toBe('comment for post 2');
        done();
      });
  });

  test('test for add comment router', (done) => {
    supertest(app)
      .post('/comments')
      .send({ comment:'comment for post 3', post_id: 3 })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.comment).toBe('comment for post 3');
        done();
      });
  });

  test('test for add post routes', (done) => {
    supertest(app)
      .post('/posts')
      .send({ title: 'title for post', content: 'content for post' })
      .expect(302)
    // .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.title).toBe('title for post');
        done();
      });
  });
});
