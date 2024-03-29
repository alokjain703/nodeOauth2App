// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')
var cors = require('cors');

// This is the client ID and client secret that you obtained
// while registering the application
// const clientID = '04f8fe029b91022e7379'
// const clientSecret = 'cfbce8122927414823e2531dfb78ceed2bd6daf0'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()


app.use(cors(
));
app.use(express.static(__dirname + '/public'))

app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  console.log('req.code',req.code);
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    // console.log('response', response);
    console.log('response.data', response.data);
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.send({accessToken:accessToken});
  })
})

// Start the server on port 8080
app.listen(8080)
