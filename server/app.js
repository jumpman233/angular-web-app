const express = require('express');
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');

const yelp_apiKey = 'yNtcqX6AbLkSjoNl5586HPsQIKagr_AEx6ocP9jaTO_D20vDJxIBrJ9pxsvcqLMYSibyENFQE0b-ejt2TFz6qXCEZg3884JC8IL9hWm3nrYxPHeZ1mH7yQEotFjKWnYx';

const client = yelp.client(yelp_apiKey);

const getBestMatch = ({ name, city, state, country, address1, address2, address3 })=>{
  return client.businessMatch('best', {
    name, city, state, country, address1, address2, address3
  }).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    return firstResult.id;
  }).catch(e => {
    console.log(e);
  });
};

const getReviewsById = (id) => {
  return client.reviews(id).then(response => {
    return response.jsonBody.reviews;
  }).catch(e => {
    console.log(e);
  });
};

const getReviewsByBestMatch = ({ name, city, state, country, address1, address2, address3 }) => {
  return getBestMatch({ name, city, state, country, address1, address2, address3 })
    .then(id => getReviewsById(id))
};

getReviewsByBestMatch({
  name: "The Little Snail Restaurant",
  city: "Sydney",
  state: "NSW",
  country: "AU",
  address1: '3/50 Murray St',
  address2: 'Pyrmont NSW 2009',
  address3: 'Australia'
}).then((data) => {
    console.log(JSON.stringify(data));
  });

// client.businessMatch('best', searchRequest).then(response => {
//   const firstResult = response.jsonBody.businesses[0];
//   const prettyJson = JSON.stringify(firstResult, null, 4);
//   console.log(prettyJson);
// }).catch(e => {
//   console.log(e);
// });

const key = 'AIzaSyBJ4bQFFJgN0S1DGVpNB5n0dfgW-AFED8w';

const baseUrl = 'http://maps.google.cn';

const app = express();

function getUrl(url, data) {
  url += '?';
  for (let i in data){
    url += i + '=' + encodeURIComponent(data[i]) + '&';
  }
  return url;
}

function getContent(address = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/geocode/json`, {
    address,
    key
  }))
    .then(res => res.json())
}

function getNearBy(location = '', radius = '', type = '', keyword = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/place/nearbysearch/json`, {
    location,
    radius,
    type,
    keyword,
    key
  }))
    .then(res => res.json());
}

function getDetails(place_id = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/place/details/json`, {
    place_id,
    key
  }))
    .then(res => res.json());
}

app.get('/address/:address', async function (req, res) {
  res.send(await getContent(req.params.address || ''));
});

app.get('/nearby', async function (req, res) {
  res.send(await getNearBy(req.query.location, req.query.radius, req.query.type, req.query.keyword));
});

const server = app.listen(5200, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
