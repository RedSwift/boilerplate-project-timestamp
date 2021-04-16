/*
A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds
*/
const supertest = require('supertest')
const app = require('./server')

test('valid date should return unix and utc timestamp in milliseconds', (done) => {
  supertest(app)
    .get('/api/2015-12-25')
    .expect(200, {
      unix: 1451001600000, 
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
    }, done)
})

test('utc timestamp should return unix timestamp and utc string accordingly', (done) => {
  supertest(app)
    .get('/api/1451001600000')
    .expect(200, {
      unix: 1451001600000,
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
    }, done)
})

test('can handle all parsable date strings', (done) => {
  supertest(app)
    .get('/api/Fri, 25 Dec 2015T00:00:00')
    .expect(400, {
      error: 'Invalid Date'
    }, done)
})

test('An empty date parameter should return the current time in a JSON object with a unix key and utc key', (done) => {
  supertest(app)
    .get('/api/')
    .expect(200, {
      utc: new Date().toUTCString(),
      // failing test due to timestamp difference in milliseconds
      unix: new Date().getTime()
    }, done)
})
