// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const formatDateToResponse = (date) => {
  const parsedDate = new Date(date)

  return {
    utc: parsedDate.toUTCString(),
    unix: parsedDate.getTime()
  }
}

const formatUnixToResponse = (date) => {
  const timestamp = parseInt(date)
  return {
    utc: new Date(timestamp).toUTCString(),
    unix: timestamp
  }
}

app.get('/api/:date', (req, res) => {
  if (+req.params.date) {
    res.json(formatUnixToResponse(req.params.date))
  }

  res.json(formatDateToResponse(req.params.date))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app
