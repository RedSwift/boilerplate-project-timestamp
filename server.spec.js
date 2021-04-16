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